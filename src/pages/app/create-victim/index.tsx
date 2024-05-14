import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVictim } from "@/api/create-victims";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; 
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const victimSchema = z.object({
  name: z.string(),
  document: z.string(),
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
  const navigate = useNavigate();

  const form = useForm<VictimSchema>({
    resolver: zodResolver(victimSchema),
  });

  const { mutateAsync: create } = useMutation({
    mutationFn: createVictim,
  });
  async function handleCreate({
    name,
    document,
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
        document,
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
        document,
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
        document,
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


  return (
    <div className="w-full flex flex-col h-full bg-zinc-950">
      <Form {...form}>
        <form
          className="flex flex-col items-center h-full"
          onSubmit={form.handleSubmit(handleCreate)}
        >
          <h1 className="text-xl text-zinc-300">Criar Vitima</h1>
          <div className="w-4/6 mb-10 grid grid-cols-3 gap-28 mt-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nome da Vítima"
                        className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="document"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Documento</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Algum Documento da Vítima"
                        className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Telefone da Vítima"
                        className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        
                        placeholder="Bairro"
                        className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Endereço"
                        className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Idade"
                        className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Profissão</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Profissão"
                        className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Estado Civil</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Ignorado"
                      >
                        <SelectTrigger className=" h-12  mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                          <SelectValue placeholder="Estado Civil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="branca">Solteiro</SelectItem>
                          <SelectItem value="preta">
                            Casado/união consensual
                          </SelectItem>
                          <SelectItem value="amarela">Viúvo</SelectItem>
                          <SelectItem value="parda">Separado</SelectItem>
                          <SelectItem value="Ignorado">Ignorado</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="ethnicity"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Etnia</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Ignorado"
                      >
                        <SelectTrigger className=" h-12  mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                          <SelectValue placeholder="Etnia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="branca">Solteiro</SelectItem>
                          <SelectItem value="preta">
                            Casado/união consensual
                          </SelectItem>
                          <SelectItem value="amarela">Viúvo</SelectItem>
                          <SelectItem value="parda">Separado</SelectItem>
                          <SelectItem value="Ignorado">Ignorado</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="auxGov"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Auxilio Governamental</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Ignorado"
                      >
                        <SelectTrigger className=" h-12  mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                          <SelectValue placeholder="Recebe Auxilio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="branca">Solteiro</SelectItem>
                          <SelectItem value="preta">
                            Casado/união consensual
                          </SelectItem>
                          <SelectItem value="amarela">Viúvo</SelectItem>
                          <SelectItem value="parda">Separado</SelectItem>
                          <SelectItem value="Ignorado">Ignorado</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Renda</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Ignorado"
                      >
                        <SelectTrigger className=" h-12  mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                          <SelectValue placeholder="Estado Civil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="branca">Solteiro</SelectItem>
                          <SelectItem value="preta">
                            Casado/união consensual
                          </SelectItem>
                          <SelectItem value="amarela">Viúvo</SelectItem>
                          <SelectItem value="parda">Separado</SelectItem>
                          <SelectItem value="Ignorado">Ignorado</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="schooling"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Escolaridade</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Ignorado"
                      >
                        <SelectTrigger className=" h-12  mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                          <SelectValue placeholder="Estado Civil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="branca">Solteiro</SelectItem>
                          <SelectItem value="preta">
                            Casado/união consensual
                          </SelectItem>
                          <SelectItem value="amarela">Viúvo</SelectItem>
                          <SelectItem value="parda">Separado</SelectItem>
                          <SelectItem value="Ignorado">Ignorado</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="disabled"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Deficiencia</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Ignorado"
                      >
                        <SelectTrigger className=" h-12  mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                          <SelectValue placeholder="Estado Civil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="branca">Solteiro</SelectItem>
                          <SelectItem value="preta">
                            Casado/união consensual
                          </SelectItem>
                          <SelectItem value="amarela">Viúvo</SelectItem>
                          <SelectItem value="parda">Separado</SelectItem>
                          <SelectItem value="Ignorado">Ignorado</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <Button
            className="w-3/6 bg-purple-800 hover:bg-purple-900 h-12 mb-10"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Registrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
