<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SB OUTLET | Backend Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Space Grotesk', sans-serif;
            background-color: #050505;
            color: #ffffff;
            scroll-behavior: smooth;
        }
        .glass {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .glow {
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.15);
        }
        .glow-red {
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.15);
        }
        .pulse {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #222; }
    </style>
</head>
<body class="min-h-screen py-12 px-6">
    <div class="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div class="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"></div>
    </div>

    <div class="max-w-5xl mx-auto">
        <header class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h1 class="text-5xl font-bold tracking-tighter uppercase italic mb-2">
                    SB <span class="text-emerald-500">OUTLET</span>
                </h1>
                <p class="text-gray-400 text-xs tracking-[0.4em] uppercase">Digital Infrastructure Dashboard</p>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right hidden md:block">
                    <p class="text-[10px] uppercase font-black tracking-widest text-gray-500">Last Refresh</p>
                    <p class="text-sm font-mono text-gray-300">{{ date('H:i:s') }}</p>
                </div>
                <div class="h-10 w-px bg-white/10 hidden md:block"></div>
                <div class="flex items-center gap-3 glass px-6 py-3 rounded-full">
                    <div class="w-2 h-2 rounded-full bg-emerald-500 pulse"></div>
                    <span class="text-[10px] font-black uppercase tracking-widest text-emerald-500 leading-none">Server Active</span>
                </div>
            </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- Health Card -->
            <div class="glass p-8 rounded-[32px] {{ $status['database_status'] === 'ONLINE' ? 'glow' : 'glow-red' }}">
                <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-6">Health & Performance</span>
                <div class="space-y-6">
                    <div>
                        <p class="text-sm text-gray-400 mb-1">Database Connection</p>
                        <p class="text-xl font-bold {{ $status['database_status'] === 'ONLINE' ? 'text-emerald-400' : 'text-red-400' }}">
                            {{ $status['database_status'] }}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-400 mb-1">Memory Utilization</p>
                        <p class="text-xl font-bold text-white">{{ $status['memory_usage'] }}</p>
                    </div>
                </div>
            </div>

            <!-- metrics -->
            <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="glass p-8 rounded-[32px] flex flex-col justify-between">
                    <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-4">Total Inventory</span>
                    <div class="flex items-end justify-between">
                        <span class="text-6xl font-bold tracking-tighter">{{ $status['products_count'] }}</span>
                        <span class="text-emerald-500 font-bold uppercase text-[10px] pb-2 tracking-widest italic">Articles Live</span>
                    </div>
                </div>
                <div class="glass p-8 rounded-[32px] flex flex-col justify-between">
                    <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-4">Order Flow</span>
                    <div class="flex items-end justify-between">
                        <span class="text-6xl font-bold tracking-tighter">{{ $status['orders_count'] }}</span>
                        <span class="text-blue-500 font-bold uppercase text-[10px] pb-2 tracking-widest italic">Total Processed</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Configuration Section -->
            <div class="glass rounded-[32px] overflow-hidden">
                <div class="p-8 border-b border-white/5 flex justify-between items-center">
                    <h2 class="text-xs font-black uppercase tracking-widest text-gray-300">System Configuration</h2>
                    <span class="text-[10px] bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest">v{{ $status['laravel_version'] }}</span>
                </div>
                <div class="p-8 space-y-4">
                    <div class="flex justify-between py-2 border-b border-white/5">
                        <span class="text-sm text-gray-500">App Environment</span>
                        <span class="text-sm font-bold uppercase text-white tracking-widest">{{ $status['env'] }}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-white/5">
                        <span class="text-sm text-gray-500">Debug Mode</span>
                        <span class="text-sm font-bold uppercase {{ $status['debug'] === 'ENABLED' ? 'text-amber-400' : 'text-emerald-400' }} tracking-widest">{{ $status['debug'] }}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-white/5">
                        <span class="text-sm text-gray-500">PHP Runtime</span>
                        <span class="text-sm font-bold text-white">{{ $status['php_version'] }}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-white/5">
                        <span class="text-sm text-gray-500">Database Driver</span>
                        <span class="text-sm font-bold text-white uppercase">{{ $status['database_driver'] }}</span>
                    </div>
                    <div class="flex justify-between py-2">
                        <span class="text-sm text-gray-500">Active Database</span>
                        <span class="text-sm font-mono text-gray-300 tracking-tighter">{{ $status['database_name'] }}</span>
                    </div>
                </div>
            </div>

            <!-- API Docs Section -->
            <div class="glass rounded-[32px] overflow-hidden">
                <div class="p-8 border-b border-white/5 flex justify-between items-center">
                    <h2 class="text-xs font-black uppercase tracking-widest text-gray-300">API Documentation</h2>
                    <span class="text-[10px] bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest">Live Endpoints</span>
                </div>
                <div class="overflow-y-auto max-h-[300px]">
                    <div class="divide-y divide-white/5 p-4">
                        @foreach($status['api_routes'] as $route)
                        <div class="p-4 flex items-center gap-4 group">
                            <span class="text-[10px] font-black uppercase px-2 py-1 rounded bg-white/5 text-gray-400 w-24 text-center">
                                {{ str_replace('GET|HEAD', 'GET', $route['method']) }}
                            </span>
                            <span class="text-sm font-mono text-emerald-500 tracking-tighter flex-1 truncate">
                                {{ $route['uri'] }}
                            </span>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        @if(isset($status['database_error']))
        <div class="mt-6 p-6 glass border-red-500/20 bg-red-500/5 rounded-[24px]">
            <div class="flex items-center gap-3 mb-2">
                <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                <span class="text-[10px] font-black uppercase tracking-widest text-red-500">Critical Error</span>
            </div>
            <p class="text-xs font-mono text-red-400 italic">{{ $status['database_error'] }}</p>
        </div>
        @endif

        <footer class="mt-16 pt-8 border-t border-white/5 text-center">
            <p class="text-[10px] text-gray-600 uppercase tracking-[0.4em] mb-2 leading-none">Powered by Antigravity AI Engine</p>
        </footer>
    </div>
</body>
</html>
