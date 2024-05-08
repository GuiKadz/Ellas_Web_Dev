import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVictim } from "@/api/create-victims";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const victimSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  phone: z.string(),
  district: z.string(),
  address: z.string(),
  age: z.string(),
  profession: z.string(),
  maritalStatus: z.string(),
  ethnicity: z.string(),
  auxGov: z.string(),
  childrens: z.string(),
  income: z.string(),
  schooling: z.string(),
  disabled: z.string(),
});

type VictimSchema = z.infer<typeof victimSchema>;

export default function CreateVictim() {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({
    district: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (cep) {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const data = response.data;
          setAddress({
            district: data.bairro,
            address: data.logradouro + "," + data.complemento,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [cep]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<VictimSchema>({
    resolver: zodResolver(victimSchema),
  });

  const { mutateAsync: create } = useMutation({
    mutationFn: createVictim,
  });
  async function handleAuthenticate({
    name,
    cpf,
    phone,
    district,
    address,
    age,
    profession,
    maritalStatus,
    ethnicity,
    auxGov,
    childrens,
    income,
    schooling,
    disabled,
  }: VictimSchema) {
    try {
      await create({
        name,
        cpf,
        phone,
        district,
        address,
        age,
        profession,
        maritalStatus,
        ethnicity,
        auxGov,
        childrens,
        income,
        schooling,
        disabled,
      });
      console.log({
        name,
        cpf,
        phone,
        district,
        address,
        age,
        profession,
        maritalStatus,
        ethnicity,
        auxGov,
        childrens,
        income,
        schooling,
        disabled,
      });
      navigate("/");
      toast.success("Criamos a vitima.");
    } catch (err) {
      toast.error("Credenciais inválidas");
      console.log({
        name,
        cpf,
        phone,
        district,
        address,
        age,
        profession,
        maritalStatus,
        ethnicity,
        auxGov,
        childrens,
        income,
        schooling,
        disabled,
      });
    }
  }
  useEffect(() => {
    if (address.district && address.address) {
      setValue("district", address.district);
      setValue("address", address.address);
    }
  }, [address, setValue]);
 
  return (
    <div className="w-full flex flex-col h-full bg-zinc-950">
      <form
        className="flex flex-col items-center h-full"
        onSubmit={handleSubmit(handleAuthenticate)}
      >
        <h1 className="text-xl text-zinc-300">Criar Vítima</h1>
        <div className="w-4/6 mb-10 grid grid-cols-3 gap-10 mt-3">
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Nome</Label>
            <Input
              type="text"
              {...register("name")}
              placeholder="Nome da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">CPF</Label>
            <Input
              type="text"
              {...register("cpf")}
              placeholder="CPF da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Telefone</Label>
            <Input
              type="text"
              {...register("phone")}
              placeholder="Telefone da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">CEP</Label>
            <Input
              type="text"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Bairro</Label>
            <Input
              type="text"
              {...register("district")}
              placeholder="Bairro da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Endereço</Label>
            <Input
              type="text"
              {...register("address")}
              autoCorrect="off"
              placeholder="Endereço da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Idade</Label>
            <Input
              {...register("age")}
              autoCorrect="off"
              placeholder="Idade da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Profissão</Label>
            <Input
              type="text"
              {...register("profession")}
              placeholder="Profissão da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Estado Civil</Label>
            <Input
              type="text"
              {...register("maritalStatus")}
              placeholder="Estado Civil da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Etnia</Label>
            <Input
              type="text"
              {...register("ethnicity")}
              placeholder="Etnia da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Auxílio Governamental</Label>
            <Input
              type="text"
              {...register("auxGov")}
              placeholder="Auxílio Governamental da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Tem filhos</Label>
            <Input
              type="text"
              {...register("childrens")}
              placeholder="Tem filhos"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Renda</Label>
            <Input
              type="text"
              {...register("income")}
              placeholder="Renda da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Escolaridade</Label>
            <Input
              type="text"
              {...register("schooling")}
              placeholder="Escolaridade da vítima"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1">Deficiência</Label>
            <Input
              type="text"
              {...register("disabled")}
              placeholder="Possui deficiencia"
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
