import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/api/sign-in";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const signInSchema = z.object({
  email: z.string().email(),
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleAuthenticate({ email }: SignInSchema) {
    try {
      await authenticate({ email });

      toast.success("Enviamos um link de autenticação para seu e-mail.", {
        action: {
          label: "Reenviar",
          onClick: () => authenticate({ email }),
        },
      });
    } catch (err) {
      toast.error("Credenciais inválidas");
    }
  }

  return (
    <div className="w-full flex flex-col h-screen">
      <a
        href="/sign-up"
        className="absolute flex ml-auto right-0 m-10 font-semibold hover:border-b-2 border-purple-700 transition-all "
      >
        Problemas com o login?
      </a>
      <form
        className="flex flex-col justify-center items-center h-full "
        onSubmit={handleSubmit(handleAuthenticate)}
      >
        <img src="/logo.png" alt="Logo" className="w-16 cursor-pointer mb-10" />
        <h1 className="text-xl mb-3 text-zinc-300 ">Acesse sua conta</h1>
        <div className="w-3/5 mb-10">
          <Label className="font-normal m-1 ">Email</Label>
          <Input
            autoCapitalize="none"
            type="email"
            autoComplete="email"
            autoCorrect="off"
            {...register("email")}
            placeholder="Seu e-mail"
            className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
          />
        </div>
        <Button className="w-3/5 bg-purple-800 hover:bg-purple-900 h-12 mb-10" type="submit" disabled={isSubmitting}>
          Entrar
        </Button>
      </form>
    </div>
  );
}
