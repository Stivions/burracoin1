import { useState, useEffect } from 'react';
import { Copy, Rocket, ChartLine as ChartLineUp, ExternalLink, Wallet, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function App() {
  const [price, setPrice] = useState<string>('0.00');
  const [holders, setHolders] = useState<number>(0);
  const CONTRACT_ADDRESS = "YOUR_SOLANA_CONTRACT_ADDRESS";
  const DEX_URL = "https://jup.ag/swap/SOL-YOUR_TOKEN_ADDRESS";
  const DISCORD_URL = "https://discord.gg/tVAbYwzvf9";

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setPrice((prev) => (parseFloat(prev) + Math.random() * 0.01).toFixed(4));
      setHolders((prev) => prev + Math.floor(Math.random() * 2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const copyContract = async () => {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    toast.success("¡Contrato copiado!");
  };

  const connectPhantom = async () => {
    try {
      // @ts-ignore
      const { solana } = window;

      if (!solana?.isPhantom) {
        window.open("https://phantom.app/", "_blank");
        toast.error("Por favor instala Phantom Wallet primero");
        return;
      }

      try {
        const resp = await solana.connect();
        toast.success("¡Wallet conectada!");
        // Redirigir a Jupiter para hacer el swap
        window.open(DEX_URL, '_blank');
      } catch (err) {
        toast.error("Error al conectar wallet");
      }
    } catch (error) {
      toast.error("Por favor instala Phantom Wallet");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
            $BURRACOIN
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            La primera criptomoneda que siempre está en oya Burracoin 🚀
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              onClick={connectPhantom}
            >
              <Wallet className="mr-2" /> Comprar con Phantom
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
              onClick={copyContract}
            >
              <Copy className="mr-2" /> Copiar Contrato
            </Button>
            <Button
              size="lg"
              className="bg-[#5865F2] hover:bg-[#4752C4]"
              onClick={() => window.open(DISCORD_URL, "_blank")}
            >
              <MessageSquare className="mr-2" /> Únete al Discord
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-black/50 border-purple-500/50 p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-2">${price}</h3>
            <p className="text-gray-400">Precio Actual</p>
          </Card>
          <Card className="bg-black/50 border-purple-500/50 p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-2">{holders}</h3>
            <p className="text-gray-400">Holders</p>
          </Card>
          <Card className="bg-black/50 border-purple-500/50 p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-2">100%</h3>
            <p className="text-gray-400">Liquidez Bloqueada</p>
          </Card>
        </div>
      </div>

      {/* Chart Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-black/50 border-purple-500/50 overflow-hidden backdrop-blur-sm">
          <div className="aspect-video">
            <iframe
              src="https://dexscreener.com/solana/YOUR_PAIR_ADDRESS"
              width="100%"
              height="100%"
              className="border-0"
              title="DEX Chart"
            />
          </div>
        </Card>
      </div>

      {/* Links Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
            onClick={() => window.open("https://solscan.io/token/" + CONTRACT_ADDRESS, "_blank")}
          >
            <ExternalLink className="mr-2" /> Ver en Solscan
          </Button>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
            onClick={() => window.open("https://dexscreener.com/solana/YOUR_PAIR_ADDRESS", "_blank")}
          >
            <ChartLineUp className="mr-2" /> Ver en Dexscreener
          </Button>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
            onClick={() => window.open("https://twitter.com/YOUR_TWITTER", "_blank")}
          >
            <Rocket className="mr-2" /> Síguenos en Twitter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;