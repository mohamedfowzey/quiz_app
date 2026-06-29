import Auth from "./(auth)/layout";
import Login from "./(auth)/login/page";

export default function Home() {
  return <Auth><Login/></Auth>;
}
