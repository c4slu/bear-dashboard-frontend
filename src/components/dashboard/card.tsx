import { LucideProps } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface PropsCard {
  value: number;
  icon: JSX.Element;
  name: string;
  ping: any;
}

export default function DashCard({ value, icon, name, ping }: PropsCard) {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row justify-between gap-5">
          <div>
            <CardTitle className="flex gap-2 items-center">
              {value}
              {ping ? (
                <ul>
                  <li
                    className={`w-2.5 h-2.5 rounded-full animate-pulse bg-red-500`}></li>
                </ul>
              ) : null}
            </CardTitle>
            <CardDescription>{name}</CardDescription>
          </div>
          <div>{icon}</div>
        </CardHeader>
      </Card>
    </div>
  );
}
