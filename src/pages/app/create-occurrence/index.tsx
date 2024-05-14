import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createOccurrence } from "@/api/create-occurrence";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const form = useForm<OccurrenceSchema>({
    resolver: zodResolver(occurrenceSchema),
    defaultValues: {
      date: undefined,
      time: "",
      institute: "",
      drugs: "",
      bond: "",
      type: "",
      victimCpf: "",
      aggressorCpf: "",
    },
  });

  const { mutateAsync: create } = useMutation({
    mutationFn: createOccurrence,
  });
  async function handleCreate({
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
        aggressorCpf,
      });
      navigate("/");
      toast.success("Criamos a ocorrencia.");
    } catch (err) {
      toast.error("Credenciais inválidas");
    }
  }

  return (
    <div className="w-full flex flex-col h-full bg-zinc-950">
      <Form {...form}>
        <form
          className="flex flex-col items-center h-full"
          onSubmit={form.handleSubmit(handleCreate)}
        >
          <h1 className="text-xl text-zinc-300">Criar Ocorrencia</h1>
          <div className="w-4/6 mb-10 grid grid-cols-3 gap-28 mt-3">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "bg-zinc-950 w-full h-12 border-zinc-800 pl-3 text-left font-normal hover:bg-zinc-800 hover:text-white",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Ignorado"
                      >
                        <SelectTrigger className="h-12 border-zinc-800">
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Manhã">Manhã</SelectItem>
                          <SelectItem value="Tarde">Tarde</SelectItem>
                          <SelectItem value="Noite">Noite</SelectItem>
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
              name="institute"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Instituição</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Ignorado"
                      >
                        <SelectTrigger className="h-12 border-zinc-800">
                          <SelectValue placeholder="Instituição de Registro" />
                        </SelectTrigger>
                        <SelectContent>
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
                          <SelectItem value="Policia Civil">
                            Policia Civil
                          </SelectItem>
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
              name="bond"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Vinculo</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Ignorado"
                      >
                        <SelectTrigger className="h-12 border-zinc-800">
                          <SelectValue placeholder="Selecione o vinculo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Familiar">Familiar</SelectItem>
                          <SelectItem value="Companheiro">
                            Companheiro
                          </SelectItem>
                          <SelectItem value="Namorado">Namorado</SelectItem>
                          <SelectItem value="Desconhecido">
                            Desconhecido
                          </SelectItem>
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
              name="type"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Tipo de Atendimento</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Ignorado"
                      >
                        <SelectTrigger className="h-12 border-zinc-800">
                          <SelectValue placeholder="Selecione o tipo de atendimento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Boletim de Ocorrencia">
                            Boletim de Ocorrencia
                          </SelectItem>
                          <SelectItem value="Orientação">Orientação</SelectItem>
                          <SelectItem value="Atendimento">
                            Atendimento
                          </SelectItem>
                          <SelectItem value="Psicologico">
                            Psicologico
                          </SelectItem>
                          <SelectItem value="Inquerito Policial">
                            Inquerito Policial
                          </SelectItem>
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
              name="drugs"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Drogas</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="Ignorado"
                      >
                        <SelectTrigger className="h-12 border-zinc-800">
                          <SelectValue placeholder="Alguem estava sob efeito de drogas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sim">Sim</SelectItem>
                          <SelectItem value="Não">Não</SelectItem>
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
              name="victimCpf"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Documento da Vitima</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Documento da Vitima"
                        className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="aggressorCpf"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Documento do Agressor</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Documento do Agressor"
                        className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
                      />
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
