"use client";

import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { Value } from "@radix-ui/react-select";
import { compileFunction } from "vm";

const checkAuthentication = () => {
  const authToken = localStorage.getItem("token"); // Ou qualquer outra forma de obter o token
  return !!authToken; // Retorna true se o token existir, ou false se não existir
};

const Login: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, []);

  

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [site, setSite] = useState("");
  const [loading, setloading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false); // Estado para controlar a visibilidade da senha
  const [loginMessage, setloginMessage] = useState("");
  const [statusLogin, setStatusLogin] = useState(false);

  const toggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleLogin = async () => {
    setloginMessage("");
    const credentials = {
      login: userName,
      senha: password,
      site: site,
    };

    if (!credentials.login || !credentials.senha || !credentials.site) {
      console.error("Invalid credentials");
      return;
    }

    console.log(credentials);

    setloading(true);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      requestMode: "cors", // Use 'cors' para permitir receber a resposta da API
    };
    try {
      const response = await fetch(
        "http://10.71.201.251/apps/serviceLogin/login",
        options
        );
        const data = await response.json();
        setStatusLogin(true);
        console.log(site)

      if (data.erro == "false") {
        const secret =
          "9bd3717297e6ef69383e2f7999eb7131448e3333f74fa613a09677ca250408e2";

        if (!secret) {
          console.error("Invalid secret");
          return;
        }
        const token = jwt.sign(credentials, secret);
        localStorage.setItem("token", token);

        if (token) {
          router.push("./dashboard");
        }
        setloading(false);
      } else {
        console.log("off");
        setloginMessage(data.message);
        setloading(false);
      }
    } catch (err) {
      console.error(err);
      setStatusLogin(false);
    }
  };

  return (
    <main className="bg-customTrans h-screen flex justify-center items-center">
      <Card className="h-2/3 w-1/3 flex flex-col justify-center bg-black">
        <CardHeader>
          <div className="space-y-2 my-2">
            <ul className="flex gap-2">
              <li className="h-5 w-5 rounded-full bg-hidden"></li>
              <li className="h-5 w-5 rounded-full bg-yellow-400"></li>
            </ul>
            <ul className="flex gap-2">
              <li className="h-5 w-5 rounded-full bg-sky-600"></li>
              <li className="h-5 w-5 rounded-full bg-orange-600"></li>
            </ul>
          </div>
          <CardTitle>Login</CardTitle>
          <CardDescription>Logue com seu usuário de rede</CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Select
                  value={"barueri"}
                  >
                  <SelectTrigger id="framework">
                    <SelectValue placeholder={site} />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Barueri">Barueri</SelectItem>
                    <SelectItem value="FSA">Feira de Santana</SelectItem>
                    <SelectItem value="SSA">Salvador</SelectItem>
                    <SelectItem value="Matriz">Matriz</SelectItem>
                    <SelectItem value="ITB">Itabuna</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="name"
                  type="number"
                  placeholder="Login Rede"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <CardDescription className="mb-4">{loginMessage}</CardDescription>
          <Button
            type="submit"
            onClick={handleLogin}
            disabled={userName && password ? false : true}>
            {loading ? (
              <span className="w-3 h-3 bg-white rounded-full animate-ping" />
            ) : (
              <span>Entrar</span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Login;
