import { getSearchResults } from "@/api/search";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { string, z } from "zod";

const searchSchema = z.object({
  search: z.string().min(1, "Campo obrigatório"),
});

type SearchSchema = z.infer<typeof searchSchema>;

export default function Search() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState({
    name: "",
  cpf: "",
  phone: "",
  district: "",
  address: "",
  age: "" ,
  profession:"" ,
  maritalStatus: "",
  ethnicity: "",
  auxGov: "",
  childrens: "",
  income:"" ,
  schooling: "",
  disabled: "",
  })
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
      const searchData = response.data;
      console.log(searchData);
      setData(searchData)
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
              maxLength={11}
              {...register("search")}
              placeholder="Digite sua pesquisa..."
            />
              <Button type="submit" disabled={isSubmitting}>
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
          <div></div>
      </div>
    </div>
  );
}
