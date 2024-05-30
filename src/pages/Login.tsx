import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import "@/../app/globals.css"
import PetCare from "@/assets/petcare.jpg"

const Login = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            <img src={PetCare} alt="Pet care" className="absolute w-full h-full object-cover" />
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md z-10">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Login</CardTitle>
                        <CardDescription>Enter your email and password to login to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="m@example.com" required type="email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" required type="password" />
                            </div>
                            <Button className="w-full" type="submit">
                                Login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;