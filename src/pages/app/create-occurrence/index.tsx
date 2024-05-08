import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createOccurrence } from "@/api/create-occurrence";

const occurrenceSchema = z.object({
  date: z.date(),
  time: z.string(),
  institute: z.string(),
  bond: z.string(),
  drugs: z.string(),
  type: z.string(),
  victimCpf: z.string(),
  aggressorCpf: z.string(),
});
type OccurrenceSchema = z.infer<typeof occurrenceSchema>;

export default function CreateOccurence() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OccurrenceSchema>({
    resolver: zodResolver(occurrenceSchema),
  });

  const { mutateAsync: create } = useMutation({
    mutationFn: createOccurrence,
  });
  async function handleAuthenticate({
    date,
    time,
    institute,
    bond,
    drugs,
    type,
    victimCpf,
    aggressorCpf,
  }: OccurrenceSchema) {
    try {
      await create({
        date,
        time,
        institute,
        bond,
        drugs,
        type,
        victimCpf,
        aggressorCpf
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
            <Label className="font-normal m-1">Data</Label>
            <Input
              type="date"
              {...register("date")}
              placeholder="Data"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Horario</Label>
            <Input
              type="text"
              {...register("time")}
              placeholder="Horario(manhã, tarde, noite)"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Instituição</Label>
            <Input
              {...register("institute")}
              autoCorrect="off"
              placeholder="Instituição"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Vinculo</Label>
            <Input
              type="text"
              placeholder="Vinculo"
              {...register("bond")}
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Drogas</Label>
            <Input
              type="text"
              {...register("drugs")}
              placeholder="Drogas"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Tipo de ocorrencias</Label>
            <Input
              type="text"
              {...register("type")}
              autoCorrect="off"
              placeholder="Tipo"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>

          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">CPF do Agressor</Label>
            <Input
              type="text"
              {...register("aggressorCpf")}
              placeholder="CPF"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">CPF da Vitima</Label>
            <Input
              type="text"
              {...register("victimCpf")}
              placeholder="CPF"
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
