import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOccurrence } from "@/api/create-occurrence";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const occurrenceSchema = z.object({
  date: z.date().default(new Date()),
  time: z.enum(["manhã", "tarde", "noite"]),
  institute: z.string(),
  bond: z.string(),
  drugs: z.boolean(),
  type: z.string(),
  victimCpf: z.string(),
  aggressorCpf: z.string(),
});

type OccurrenceSchema = z.infer<typeof occurrenceSchema>;

export default function CreateOccurrence() {
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

  async function handleCreate(data: OccurrenceSchema) {
    console.log(data);
    try {
      await create(data);
      toast.success("Ocorrência criada com sucesso!");
    } catch (err) {
      toast.error("Erro ao criar ocorrência");
    }
  }

  return (
    <div className="w-full flex flex-col h-screen ">
      <form
        className="flex flex-col items-center h-full"
        onSubmit={handleSubmit(handleCreate)}
      >
        <h1 className="text-xl   text-zinc-300 ">Criar Ocorrência</h1>
        <div className="w-4/6 mb-10 grid grid-cols-2 gap-10 mt-3">
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">Hora</Label>
            <Select {...register("time")}>
              <SelectTrigger className="p-2 h-12 mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                <SelectValue placeholder="Horario" />
              </SelectTrigger>
              <SelectContent className=" text-white border-zinc-900 bg-purple-800">
                <SelectItem value="manhã">Manhã</SelectItem>
                <SelectItem value="tarde">Tarde</SelectItem>
                <SelectItem value="noite">Noite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">Instituto</Label>
            <Select {...register("institute")}>
              <SelectTrigger className="p-2   h-12   mx-auto my-auto   outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                <SelectValue placeholder="Instituição de Registro" />
              </SelectTrigger>
              <SelectContent className=" text-white border-zinc-900 bg-purple-800">
                <SelectItem value="Ministerio Publico">
                  Ministerio Publico
                </SelectItem>
                <SelectItem value="Delegacia da Mulher">
                  Delegacia da Mulher
                </SelectItem>
                <SelectItem value="CREAS">CREAS</SelectItem>
                <SelectItem value="CRAS">CRAS</SelectItem>
                <SelectItem value="UPA">UPA</SelectItem>
                <SelectItem value="CAPS">CAPS</SelectItem>
                <SelectItem value="US">US</SelectItem>
                <SelectItem value="Policia Civil">Policia Civil</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">Vínculo</Label>
            <Select {...register("bond")}>
              <SelectTrigger className="p-2   h-12   mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                <SelectValue placeholder="Tipo de Vínculo" />
              </SelectTrigger>
              <SelectContent className=" text-white border-zinc-900 bg-purple-800">
                <SelectItem value="Familiar">Familiar</SelectItem>
                <SelectItem value="Companheiro">Companheiro</SelectItem>
                <SelectItem value="Namorado">Namorado</SelectItem>
                <SelectItem value="Desconhecido">Desconhecido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">Drogas</Label>
            <Select {...register("drugs")}>
              <SelectTrigger className="p-2   h-12   mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                <SelectValue placeholder="Alguem estava sob efeito de drogas" />
              </SelectTrigger>
              <SelectContent className=" text-white border-zinc-900 bg-purple-800">
                <SelectItem value="true">Sim</SelectItem>
                <SelectItem value="false">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">Tipo de atendimento</Label>
            <Select {...register("type")}>
              <SelectTrigger className="p-2   h-12   mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                <SelectValue placeholder="Selecione o Atendimento" />
              </SelectTrigger>
              <SelectContent className=" text-white border-zinc-900 bg-purple-800">
                <SelectItem value="boletimDeOcorrencia">
                  Boletim de Ocorrencia
                </SelectItem>
                <SelectItem value="orientaçao">Orientação</SelectItem>
                <SelectItem value="atendimento">Atendimento</SelectItem>
                <SelectItem value="psicologico">Psicologico</SelectItem>
                <SelectItem value="inquerito">Inquerito Policial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">CPF da Vítima</Label>
            <Input
              type="text"
              {...register("victimCpf")}
              placeholder="CPF da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">CPF do Agressor</Label>
            <Input
              type="text"
              {...register("aggressorCpf")}
              placeholder="CPF do agressor"
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
