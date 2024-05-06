import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAggressor } from "@/api/register-aggressor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createAggressor } from "@/api/create-aggressor";

const aggressorSchema = z.object({
  name: z.string(),
  cpf: z.string().length(11), // assuming CPF is 11 digits
  age: z.number().int(),
  ethnicity: z.string(),
  schooling: z.string(),
  substanceAddiction: z.boolean(),
  criminalRecord: z.boolean(),
});

type AggressorSchema = z.infer<typeof aggressorSchema>;

export default function RegisterAggressor() {
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

  async function handleRegister(data: AggressorSchema) {
    console.log(data);
    try {
      await create(data);
      toast.success("Aggressor registered successfully!");
    } catch (err) {
      toast.error("Error registering aggressor");
    }
  }

  return (
    <div className="w-full flex flex-col h-screen ">
      <form
        className="flex flex-col items-center h-full"
        onSubmit={handleSubmit(handleRegister)}
      >
        <h1 className="text-xl   text-zinc-300 ">Register Aggressor</h1>
        <div className="w-4/6 mb-10 grid grid-cols-2 gap-10 mt-3">
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">Name</Label>
            <Input
              type="text"
              {...register("name")}
              placeholder="Name"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">CPF</Label>
            <Input
              type="text"
              {...register("cpf")}
              placeholder="CPF"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">Age</Label>
            <Input
              type="number"
              {...register("age")}
              placeholder="Age"
              className="focus:outline-purple-800 placeholder:font-normal bg-zinc-950 outline-zinc-800 focus:border-purple-700 border-solid focus:border-2 h-12 text-md"
            />
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">Ethnicity</Label>
            <Select {...register("ethnicity")}>
              <SelectTrigger className="p-2   h-12   mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                <SelectValue placeholder="Ethnicity" />
              </SelectTrigger>
              <SelectContent className=" text-white border-zinc-900 bg-purple-800">
                <SelectItem value="White">White</SelectItem>
                <SelectItem value="Black">Black</SelectItem>
                <SelectItem value="Asian">Asian</SelectItem>
                <SelectItem value="Indigenous">Indigenous</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">Schooling</Label>
            <Select {...register("schooling")}>
              <SelectTrigger className="p-2   h-12   mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                <SelectValue placeholder="Schooling" />
              </SelectTrigger>
              <SelectContent className=" text-white border-zinc-900 bg-purple-800">
                <SelectItem value="No education">No education</SelectItem>
                <SelectItem value="Incomplete elementary education">
                  Incomplete elementary education
                </SelectItem>
                <SelectItem value="Elementary education">
                  Elementary education
                </SelectItem>
                <SelectItem value="Incomplete high school education">
                  Incomplete high school education
                </SelectItem>
                <SelectItem value="High school education">
                  High school education
                </SelectItem>
                <SelectItem value="Incomplete superior course">
                  Incomplete superior course
                </SelectItem>
                <SelectItem value="Superior course">Superior course</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">Marital Status</Label>
            <Select {...register("maritalStatus")}>
              <SelectTrigger className="p-2   h-12   mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                <SelectValue placeholder="Marital Status" />
              </SelectTrigger>
              <SelectContent className=" text-white border-zinc-900 bg-purple-800">
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Widower">Widower</SelectItem>
                <SelectItem value="Divorced">Divorced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mb-10 flex flex-col justify-center">
            <Label className="font-normal m-1 ">Employment</Label>
            <Select {...register("employment")}>
              <SelectTrigger className="p-2   h-12   mx-auto my-auto  outline-purple-800 border border-zinc-600 focus:border-none rounded-md focus:outline focus:outline-2">
                <SelectValue placeholder="Employment" />
              </SelectTrigger>
              <SelectContent className=" text-white border-zinc-900 bg-purple-800">
                <SelectItem value="Unemployed">Unemployed</SelectItem>
                <SelectItem value="Employed">Employed</SelectItem>
                <SelectItem value="Self-employed">Self-employed</SelectItem>
              </SelectContent>
            </Select>
          </div>
         
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-600 p-2 text-white font-semibold rounded-md focus:outline-none"
        >
          Register
        </button>
      </form>
    </div>
  );
}