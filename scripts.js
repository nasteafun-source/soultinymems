<script>
    const memeGrid = document.getElementById('meme-grid');
    const randomBtn = document.querySelector('nav a:nth-child(3)'); // Ссылка "Случайный"

    async function fetchMemes() {
        try {
            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json();
            const memes = data.data.memes;
            
            // Очищаем сетку перед добавлением новых
            memeGrid.innerHTML = '';

            // Берем 6 случайных мемов
            const shuffled = memes.sort(() => 0.5 - Math.random()).slice(0, 6);

            shuffled.forEach(meme => {
                const card = `
                    <div class="meme-card bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 shadow-xl">
                        <img src="${meme.url}" alt="${meme.name}" class="w-full h-64 object-cover">
                        <div class="p-4">
                            <h3 class="font-bold text-lg mb-2 truncate">${meme.name}</h3>
                            <div class="flex justify-between items-center text-sm text-zinc-400">
                                <button class="hover:text-yellow-400">⚡ Искра</button>
                                <button class="hover:text-red-500">❤️ ${Math.floor(Math.random() * 500)}</button>
                            </div>
                        </div>
                    </div>
                `;
                memeGrid.innerHTML += card;
            });
        } catch (error) {
            console.error('Ошибка при загрузке мемов:', error);
        }
    }

    // Загружаем при старте и по клику
    randomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fetchMemes();
    });

    fetchMemes();
</script>
