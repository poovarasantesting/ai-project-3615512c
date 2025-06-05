import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  CreditCard, 
  Check,
  ChevronRight
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zipCode ||
      !shippingInfo.email
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required shipping fields",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "credit-card") {
      if (
        !cardInfo.cardNumber ||
        !cardInfo.cardName ||
        !cardInfo.expiry ||
        !cardInfo.cvv
      ) {
        toast({
          title: "Missing payment information",
          description: "Please fill in all required payment fields",
          variant: "destructive",
        });
        return;
      }
    }

    // Process order
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. Your order has been confirmed.",
      });
      navigate("/");
    }, 2000);
  };

  // If cart is empty, redirect to products
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">
          Add some products to your cart before proceeding to checkout.
        </p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/cart" className="hover:text-gray-700">Cart</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="font-medium">Checkout</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="address">Address*</Label>
                  <Input
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="city">City*</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province*</Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip/Postal Code*</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Method */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="credit-card">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="paypal">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.416a.641.641 0 0 1 .634-.546h6.981c2.014 0 3.46.342 4.301 1.016.789.63 1.248 1.475 1.368 2.517.032.284.049.521.049.713v.266c0 .144-.006.296-.017.459a6.94 6.94 0 0 1-.517 2.158 4.755 4.755 0 0 1-1.15 1.565c-.501.458-1.104.817-1.794 1.069a8.261 8.261 0 0 1-2.388.362H9.226a.855.855 0 0 0-.845.734L7.076 21.337ZM10.102 9.45H7.587l-.598 3.775h2.512c.785 0 1.408-.094 1.854-.28.446-.186.76-.485.941-.896.182-.41.273-.99.273-1.735 0-.372-.076-.665-.229-.875-.152-.21-.4-.352-.744-.428A5.368 5.368 0 0 0 10.102 9.45ZM16.659 7.147l-1.523 9.627h4.215c.371 0 .642-.294.704-.662l1.455-9.101a.641.641 0 0 0-.634-.739h-3.567c-.277 0-.519.186-.604.458l-.46.417Z"/>
                      </svg>
                      PayPal
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="credit-card">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number*</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardInfo.cardNumber}
                          onChange={handleCardInfoChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardName">Name on Card*</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          value={cardInfo.cardName}
                          onChange={handleCardInfoChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date*</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={handleCardInfoChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV*</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={cardInfo.cvv}
                            onChange={handleCardInfoChange}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="paypal">
                    <div className="text-center py-6">
                      <p className="mb-4">You will be redirected to PayPal to complete your purchase.</p>
                      <Button type="button" variant="outline">
                        Connect with PayPal
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Submit Button */}
            <div className="mb-8 lg:hidden">
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{item.quantity}x</span>
                      <span className="truncate max-w-[160px]">{item.title}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(total + total * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                type="submit"
                onClick={handleSubmit}
                className="w-full" 
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>By placing your order, you agree to our</p>
                <div className="flex justify-center space-x-1">
                  <Link to="#" className="text-blue-600 hover:underline">Terms of Service</Link>
                  <span>and</span>
                  <Link to="#" className="text-blue-600 hover:underline">Privacy Policy</Link>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-center text-sm">
                <Check className="text-green-500 mr-2 h-4 w-4" />
                <span>100% Secure Checkout</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}