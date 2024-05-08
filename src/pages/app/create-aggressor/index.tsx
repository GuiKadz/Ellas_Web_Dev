import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createAggressor } from "@/api/create-aggressor";

const aggressorSchema = z.object({
    name: z.string(),
    cpf: z.string(), 
    age: z.string(),
    ethnicity: z.string(),
    schooling: z.string(),
    substanceAddiction: z.string(),
    criminalRecord: z.string(),
});

type AggressorSchema = z.infer<typeof aggressorSchema>;

export default function CreateAggressor() {
 const navigate = useNavigate();

  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AggressorSchema>({
    resolver: zodResolver(aggressorSchema),
  });

  const { mutateAsync: create } = useMutation({
    mutationFn: createAggressor,
  });
  async function handleAuthenticate({
   name,
   cpf,
   age,
   criminalRecord,
   ethnicity,
   schooling,
   substanceAddiction
  }: AggressorSchema) {
    try {
      await create({
        name,
        cpf,
        age,
        ethnicity,
        schooling,
        criminalRecord,
        substanceAddiction,
      });
      console.log({
        name,
     cpf,  
        age,
        ethnicity,
        schooling,
        criminalRecord,
        substanceAddiction,
      });
      navigate("/");
      toast.success("Criamos a vitima.");
    } catch (err) {
      toast.error("Credenciais inválidas");
    }
  }
 
 
  return (
    <div className="w-full flex flex-col h-full bg-zinc-950">
      <form
        className="flex flex-col items-center h-full"
        onSubmit={handleSubmit(handleAuthenticate)}
      >
        <h1 className="text-xl text-zinc-300">Criao agressor</h1>
        <div className="w-4/6 mb-10 grid grid-cols-3 gap-10 mt-3">
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Nome</Label>
            <Input
              type="text"
              {...register("name")}
              placeholder="Nome do agressor"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">CPF</Label>
            <Input
              type="text"
              {...register("cpf")}
              placeholder="CPF do agressor"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div><div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Idade</Label>
            <Input
              {...register("age")}
              autoCorrect="off"
              placeholder="Idade do agressor"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Etnia</Label>
            <Input
              type="text"
              placeholder="Etnia"
              {...register("ethnicity")}
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Escolaridade</Label>
            <Input
              type="text"
              {...register("schooling")}
              placeholder="Escolaridade do agressor"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Ficha Criminal</Label>
            <Input
              type="text"
              {...register("criminalRecord")}
              autoCorrect="off"
              placeholder="Endereço do agressor"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Vicios</Label>
            <Input
              type="text"
              {...register("substanceAddiction")}
              placeholder="Possui algum vicio em drogas"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>

        </div>
        <Button
          className="w-3/6 bg-purple-800 hover:bg-purple-900 h-12 mb-10"
          type="submit"
          disabled={isSubmitting}
        >
          Registrar
        </Button>
      </form>
    </div>
  );
}
