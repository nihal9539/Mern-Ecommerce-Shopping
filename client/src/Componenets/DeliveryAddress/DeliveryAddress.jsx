import { Button, Group, Select, Textarea, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import { useForm } from "@mantine/form";

const DeliveryAddress = ({ orderDetails, setOrderDetails, nextStep }) => {
  const { allStates } = useCountries();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
        firstName: orderDetails.firstName,
        lastName: orderDetails.lastName,
        phone: orderDetails.phone,
        state:orderDetails.state,
        address: orderDetails.address,
        pincode: orderDetails.pincode,
     
    },

    // validate: {
    //   firstName: (value) =>
    //     value.length < 5 ? "First name must have at least 5 letters" : null,
    //   lastName: (value) =>
    //     value.length < 5 ? "First name must have at least 5 letters" : null,
    //   pincode: (value) =>
    //     value.length < 5 ? "Select a valid pincode" : null,
    //   phone: (value) =>
    //     value.length < 5 ? "Select a valid Phone Number" : null,
    //   address: (value) =>
    //     value.length < 10 ? "Address must have at least 5 letters" : null,

    //   country: (value) =>
    //     allCountries.includes(value) ? null : "Select a valid country",
    // },
  });
  const handleSubmit = () => {
    // const { hasErrors } = form.validate();
    // if (!hasErrors) {
        // setOrderDetails((prev) => ({ ...prev, city, address, country }))
        nextStep()
    // }
}

  return (
    <form className="flex flex-col p-10 w-full " onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit()
    }}>
      <div className="w-full flex flex-row gap-5">
        <TextInput
          w={"100%"}
          withAsterisk
          label={"First name"}
          {...form.getInputProps("firstName", { type: "input" })}
        />

        <TextInput
          w={"100%"}
          withAsterisk
          label={"Last name"}
          {...form.getInputProps("lastName", { type: "input" })}
        />
      </div>

      <div className="flex flex-row w-full gap-5">
        <Select
          w={"100%"}
          label={"State"}
          withAsterisk
          searchable
          clearable
          placeholder="Select State"
          data={allStates}
          {...form.getInputProps("state", { type: "input" })}
        />
        <TextInput
          w={"100%"}
          withAsterisk
          label={"City"}
          {...form.getInputProps("city", { type: "input" })}
        />
      </div>
      <div className="flex flex-row gap-5">
        <TextInput
          w={"100%"}
          withAsterisk
          label={"Phone"}
          {...form.getInputProps("phone", { type: "input" })}
        />
        <TextInput
          w={"100%"}
          withAsterisk
          label={"Pincode"}
          {...form.getInputProps("pincode", { type: "input" })}
        />
      </div>
      <div>
        <Textarea
          w={"100%"}
          withAsterisk
          rows={4}
          maxLength={800}
          label={"Address"}
          placeholder="Address (Area and street)"
          {...form.getInputProps("address", { type: "input" })}
        />
      </div>
      <Group className="" justify="flex-start" mt="xl">
        <Button
          style={{ background: "black" }}
          type="submit"
          className="w-full h-12 hover:shadow-boxShadow1 border-2 duration-300 border-black"
        >
          Submit
        </Button>
        {/* <input style={{background:"#0047AB"}} type="submit" value="submit" /> */}
      </Group>
    </form>
  );
};

export default DeliveryAddress;
