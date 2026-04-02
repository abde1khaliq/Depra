import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function RootPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }
}