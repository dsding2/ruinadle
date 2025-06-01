import Ruinadle from "~/main";
import type { Route } from "./+types/home";
import { Provider } from "react-redux";
import { store } from "~/redux/store";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Provider store={store}><Ruinadle></Ruinadle></Provider>;
}
