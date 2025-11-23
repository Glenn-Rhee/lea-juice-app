import Image from "next/image";

export default function Error(props: { message: string; code: number }) {
  const { message, code } = props;
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-2">
        <Image
          src={"/warning.png"}
          alt="Error icon image"
          width={250}
          height={200}
        />
        <h1 className="text-4xl text-white font-bold">ERROR {code}!</h1>
        <p className="text-white font-medium text-xl">{message}</p>
      </div>
    </div>
  );
}
