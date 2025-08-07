"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import CustomFormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"




const authFormSchema = (type : FormType) => {
  return z.object({
    name : type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(4, "Password must be at least 4 characters long"),
  })
}


const AuthForm = ({type}:{type: FormType}) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if (type === "sign-up") {
        const {name, email, password} = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password
        })
        if(!result?.success){
          toast.error(result.message);
          return;
        }
        toast.success("Account created successfully! please Sign In");
        router.push("/sign-in");
      }else{
        const {email, password} = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();
        if(!idToken){
          toast.error('Sign In failed, please try again');
          return;
        }
        await signIn({
          email,
          idToken
        });
        toast.success("Signed in successfully!");
        router.push("/");
      }

    }catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  }
  
  const isSignIn = type === "sign-in";

  return (
    <section className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={32} height={32}/>
          <h2 className="text-primary-100">Will They Hire Me?</h2>
        </div>
        <h3 className ="text-center">Give Mock Interviews with AI</h3>

        {/* The Form and form tag are now correctly placed inside the card */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <CustomFormField 
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <CustomFormField 
                control={form.control}
                name="email"
                label="Email"
                placeholder="Your Email"
                type ="email"
            />
            <CustomFormField 
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter Password"
                type="password"
            />
            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create An Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">{isSignIn ? 'No Account yet !':'Already a user'}
          <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary-100 ml-1">
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </section>
  )
}

export default AuthForm
