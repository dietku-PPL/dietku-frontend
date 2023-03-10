import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";

export default function FormLogin({
  loginForm,
  setIsFormLogin,
  isLoading,
}) {
  return (
    <form onSubmit={loginForm.handleSubmit}>
      <VStack spacing={5}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Masukkan alamat email anda"
            id="email"
            name="email"
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Kata Sandi</FormLabel>
          <Input
            type="password"
            placeholder="Masukkan kata sandi anda"
            id="password"
            name="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
          />
        </FormControl>
        <Button
          isLoading={isLoading}
          colorScheme={"green"}
          type={"submit"}
        >
          Masuk
        </Button>
        <HStack py={5}>
          <Text>Belum punya akun?</Text>
          <Text color={"green"} onClick={setIsFormLogin} cursor={"pointer"}>
            Daftar
          </Text>
        </HStack>
      </VStack>
    </form>
  );
}
