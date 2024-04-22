import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="container relative hidden min-h-screen flex-col items-center justify-center antialiased md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 text-white">
      <div className="bg-purple-800 relative hidden h-full flex-col border-foreground/5 bg-muted p-10 text-muted-foreground  lg:flex text-white">
        <video
          muted
          loop
          autoPlay
          preload="none"
          className="absolute inset-0 object-cover w-full h-full z-10 shadow-md"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
        <div className="w-full justify-center flex items-center gap-3 text-lg font-medium text-foreground z-20">
          <img src="/image.png" alt="Logo Ellas Sign-in" className="w-3/12 cursor-pointer"/>
        </div>
        <div className="flex flex-col justify-center items-center h-full gap-3 z-20">
            <h1 className="text-3xl w-2/4    text-center font-extrabold">Bem vindo novamente</h1>
            <p className="text-lg w-2/4 text-center">Acompanhe os dados em tempo real sobre a violencia domestica</p>
        </div>
        <div className="mt-auto z-20">
          <footer className="text-sm z-20">
            Painel da organização &copy; Sistema Ellas - {new Date().getFullYear()}
          </footer>
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col bg-zinc-900">
        <Outlet />
      </div>
    </div>
  );
}
