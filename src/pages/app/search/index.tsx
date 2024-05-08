import { getSearchResults } from "@/api/search";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Folder } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const searchSchema = z.object({
  search: z.string().min(1, "Campo obrigatório"),
});

type SearchSchema = z.infer<typeof searchSchema>;

interface PersonData {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  district: string;
  address: string;
  age: number;
  profession: string;
  maritalStatus: string;
  ethnicity: string;
  auxGov: string;
  childrens: boolean;
  income: number;
  schooling: string;
  disabled: boolean;
}

interface AggressorData {
  aggressorId: string;
  bond: string;
  createdAt: string;
  date: string;
  description?: string | null;
  drugs: boolean;
  id: string;
  institute: string;
  time: string;
  type: string;
  victimId: string;
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const [personData, setPersonData] = useState<PersonData | null>(null);
  const [incident, setIncident] = useState<AggressorData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: searchParams.get("search") ?? "",
    },
  });
  const onSubmit = async (data: SearchSchema) => {
    try {
      const response = await getSearchResults(data.search);

      console.log(response);
      setPersonData(response.victim[0]);
      setIncident(response.occurrences[0]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Dialog defaultOpen>
        <DialogContent className="bg-zinc-950 text-white border-zinc-800">
          <DialogHeader>
            <DialogTitle>Pesquisar</DialogTitle>
            <DialogDescription>
              Digite o CPF ou telefone da pessoa.
            </DialogDescription>
          </DialogHeader>
          <Separator orientation="vertical" />
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <Input
              className="h-12"
              maxLength={11}
              {...register("search")}
              placeholder="Digite sua pesquisa..."
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 hover:bg-purple-700"
            >
              Proucurar
            </Button>
          </form>
          {errors.search && (
            <div className="text-red-700 w-full text-center">
              {errors.search.message}...
            </div>
          )}
        </DialogContent>
      </Dialog>
      <div>
        {personData && (
          <div className="w-full h-full">
            <h1 className="text-2xl w-full text-center">Dados da pessoa</h1>
            <div className="w-full flex flex-col justify-center mt-10 border-zinc-800 border rounded-lg ">
              <ul className="grid grid-cols-3 gap-12 m-10 text-white">
                <li>
                  <strong>Nome: </strong> {personData.name}
                </li>
                <li>
                  <strong>CPF: </strong> {personData.cpf}
                </li>
                <li>
                  <strong>Telefone: </strong> {personData.phone}
                </li>
                <li>
                  <strong>Bairro: </strong> {personData.district}
                </li>
                <li>
                  <strong>Endereço: </strong> {personData.address}
                </li>
                <li>
                  <strong>Idade: </strong> {personData.age}
                </li>
                <li>
                  <strong>Profissão: </strong> {personData.profession}
                </li>
                <li>
                  <strong>Estado civil: </strong> {personData.maritalStatus}
                </li>
                <li>
                  <strong>Etnia: </strong> {personData.ethnicity}
                </li>
                <li>
                  <strong>Auxílio governamental: </strong> {personData.auxGov}
                </li>
                <li>
                  <strong>Filhos: </strong>{" "}
                  {personData.childrens ? "Sim" : "Não"}
                </li>
                <li>
                  <strong>Renda: </strong> {personData.income ? "Sim" : "Não"}
                </li>
                <li>
                  <strong>Escolaridade: </strong> {personData.schooling}
                </li>
                <li>
                  <strong>Deficiência: </strong> {personData.disabled}
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className="flex justify-end mt-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-700 gap-3 hover:bg-purple-600 w-1/6">
                Ultima Ocorrencia
                <Folder width={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-zinc-800 text-white ">
              <DialogHeader>
                <DialogTitle>Ocorrencias</DialogTitle>
                <DialogDescription>
                  Ultima ocorrencia da vítima
                </DialogDescription>
              </DialogHeader>
              <Separator orientation="vertical" />
              <div>
                <ul className="grid gap-12 m-10 text-white">
                  <li>
                    <strong>ID: </strong> {incident?.id}
                  </li>
                  <li>
                    <strong>Tipo: </strong> {incident?.type}
                  </li>
                  <li>
                    <strong>Data: </strong> {incident?.date}
                  </li>
                  <li>
                    <strong>Hora: </strong> {incident?.time}
                  </li>
                  <li>
                    <strong>Instituição: </strong> {incident?.institute}
                  </li>
                  <li>
                    <strong>Vinculo: </strong> {incident?.bond}
                  </li>
                  <li>
                    <strong>Uso de drogas: </strong> {incident?.drugs ? "Sim" : "Não"}
                  </li>
                  <li>
                    <strong>ID de vitima: </strong> {incident?.victimId}
                  </li>
                  <li>
                    <strong>ID do agressor: </strong> {incident?.aggressorId}
                  </li>
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
