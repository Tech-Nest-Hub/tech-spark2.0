"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  StarHalf,
  Package,
  DollarSign,
  Tag,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

// Updated Product type to match your API
type Product = {
  id: number;
  name: string;
  photo: string;
  tag: string;
  rating: number;
  reviews: number;
  ecoFriendly: boolean;
  amount?: number; // Assuming amount is optional
  createdAt?: string;
  updatedAt?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for create/edit
  const [formData, setFormData] = useState({
    name: "",
    photo: null as File | null,
    tag: "",
    rating: "",
    reviews: "",
    amount: 0,
    ecoFriendly: false,
  });

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      toast.success("Products fetched successfully", {
        description: `${data.length} products loaded.`,
      });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredProducts.slice(startIndex, endIndex);

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  // Handle form submission for create
  const handleCreate = async () => {
    if (!formData.name || !formData.tag) {
      toast.error("Please fill in required fields");
      return;
    }
    console.log("Form Data:", formData);
    try {
      setIsSubmitting(true);

      let photoUrl = "/placeholder.svg";

      // Only upload if a photo file is selected
      if (formData.photo) {
        const uploadData = new FormData();
        uploadData.append("file", formData.photo);

        const res = await axios.post("/api/upload", uploadData);
        photoUrl = res.data.url;
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          photo: photoUrl,
          tag: formData.tag,
          rating: parseFloat(formData.rating) || 0,
          reviews: parseInt(formData.reviews),
          ecoFriendly: formData.ecoFriendly,
          amount: formData.amount || 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      setIsCreateDialogOpen(false);
      resetForm();
      fetchProducts(); // Refresh product list
      toast.success("Product Created", {
        description: "Product has been successfully created.",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission for edit
  const handleEdit = async () => {
    if (!editingProduct || !formData.name || !formData.tag) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          photo: formData.photo || "/placeholder.svg?height=200&width=200",
          tag: formData.tag,
          rating: parseFloat(formData.rating) || 0,
          reviews: parseInt(formData.reviews) || 0,
          ecoFriendly: formData.ecoFriendly,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? updatedProduct : product
      );

      setProducts(updatedProducts);
      setIsEditDialogOpen(false);
      setEditingProduct(null);
      resetForm();
      toast.success("Product Updated", {
        description: "Product has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Product Deleted", {
        description: "Product has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      photo: null,
      tag: "",
      rating: "",
      reviews: "",
      amount: 0,
      ecoFriendly: false,
    });
  };

  // Open edit dialog
  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      photo: null,
      tag: product.tag,
      rating: product.rating.toString(),
      reviews: product.reviews.toString(),
      ecoFriendly: product.ecoFriendly,
      amount: product.amount || 0,
    });
    setIsEditDialogOpen(true);
  };

  // Open view dialog
  const openViewDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsViewDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2 text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Header with Search and Create Button */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Products Management</h1>
            <p className="text-muted-foreground">
              Manage your marketplace products and inventory
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[300px]"
              />
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Product</DialogTitle>
                  <DialogDescription>
                    Add a new product to your marketplace.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="photo">Photo URL</Label>
                    <Input
                      id="photo"
                      type="file"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          photo: e.target.files?.[0] || null,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tag">Tag/Category *</Label>
                    <Input
                      id="tag"
                      value={formData.tag}
                      onChange={(e) =>
                        setFormData({ ...formData, tag: e.target.value })
                      }
                      placeholder="Enter product tag/category"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="rating">Rating (0-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData({ ...formData, rating: e.target.value })
                        }
                        placeholder="0"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reviews">Reviews</Label>
                      <Input
                        id="reviews"
                        value={formData.reviews}
                        onChange={(e) =>
                          setFormData({ ...formData, reviews: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            amount: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="ecoFriendly"
                        checked={formData.ecoFriendly}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ecoFriendly: e.target.checked,
                          })
                        }
                        className="rounded"
                      />
                      <Label htmlFor="ecoFriendly">Eco-Friendly Product</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreate} disabled={isSubmitting}>
                    {isSubmitting && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    Create Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products List</CardTitle>
            <CardDescription>
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Tag/Category</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Reviews</TableHead>
                  <TableHead>Eco-Friendly</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.photo || "/placeholder.svg"}
                          alt={product.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.tag}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                        <span className="text-sm text-muted-foreground ml-1">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.reviews}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={product.ecoFriendly ? "default" : "outline"}
                      >
                        {product.ecoFriendly ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewDialog(product)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Product
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{product.name}
                                "? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(product.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={rowsPerPage.toString()}
                  onValueChange={(value) => {
                    setRowsPerPage(parseInt(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent side="top">
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    {"<<"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    {"<"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    {">"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    {">>"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Product Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {selectedProduct.name}
                  </DialogTitle>
                  <DialogDescription>Product details</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <img
                        src={selectedProduct.photo || "/placeholder.svg"}
                        alt={selectedProduct.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">
                          Product Information
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            <span>Tag: {selectedProduct.tag}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            <span>Reviews: {selectedProduct.reviews}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                selectedProduct.ecoFriendly
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {selectedProduct.ecoFriendly
                                ? "Eco-Friendly"
                                : "Standard"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Rating</h4>
                        <div className="flex items-center gap-2">
                          {renderStars(selectedProduct.rating)}
                          <span className="text-sm">
                            {selectedProduct.rating.toFixed(1)} (
                            {selectedProduct.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update product information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Product Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-photo">Photo URL</Label>
                <Input
                  id="edit-photo"
                  type="file"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      photo: e.target.files?.[0] || null,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-tag">Tag/Category *</Label>
                <Input
                  id="edit-tag"
                  value={formData.tag}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="edit-rating">Rating (0-5)</Label>
                  <Input
                    id="edit-rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-reviews">Reviews Count</Label>
                  <Input
                    id="edit-reviews"
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) =>
                      setFormData({ ...formData, reviews: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-ecoFriendly"
                    checked={formData.ecoFriendly}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ecoFriendly: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <Label htmlFor="edit-ecoFriendly">Eco-Friendly Product</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleEdit} disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Update Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
