import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import "@/../app/globals.css"
import PetCare from "../assets/petcare.jpg"
import Paw from "../assets/Paw2.svg"

const Register = () => {
    return (
        <div>
            <div className="absolute bg-black bg-opacity-90 z-30 h-[65rem] w-[55rem]">
                <Card className="relative ml-[12vw] mt-[22vh] max-w-sm z-20">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Register</CardTitle>
                            <CardDescription>Enter your details to create a new account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="m@example.com" required type="email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" required type="text" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" required type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" required type="password" />
                            </div>
                            <Button className="w-full" type="submit">
                                Register
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="blur-[4px]">
                <img src={PetCare} alt="Pet care" className="translate-y-[19vh] z-10 scale-[1.75]" />
            </div>
            <img src={Paw} alt="Pet care" className="translate-y-[-26vh] translate-x-[130vh] z-0 w-[18rem] color-white" />

        </div>
    );
};

export default Register;