export function mediaFactory(item, photographer) {
    const { image, video, title, likes: initialLikes } = item;
    const folder = photographer.name.split(' ')[0].replace(/-/g, ' ');
    const filename = image || video;
    const mediaPath = `assets/media/${folder}/${filename}`;

    function getMediaCardDOM() {
        let likesCount = initialLikes;
        let hasLiked = false;

        const article = document.createElement('article');
        article.className = 'media-card';

        // 1. Média (image ou vidéo)
        let mediaEl;
        if (image) {
            mediaEl = document.createElement('img');
            mediaEl.src = mediaPath;
            mediaEl.alt = title;
        } else {
            mediaEl = document.createElement('video');
            mediaEl.setAttribute('controls', '');
            const src = document.createElement('source');
            src.src = mediaPath;
            mediaEl.appendChild(src);
        }
        article.appendChild(mediaEl);

        // 2. Bloc info
        const info = document.createElement('div');
        info.className = 'media-info';

        const titleEl = document.createElement('h3');
        titleEl.textContent = title;
        titleEl.tabIndex = 0;

        const likeBtn = document.createElement('button');
        likeBtn.className = 'like-button';
        likeBtn.setAttribute('aria-pressed', 'false');
        likeBtn.setAttribute('aria-label', `J’aime ${title}`);
        likeBtn.textContent = `${likesCount} ❤`;

        // 3. Gestion du clic = toggle
        likeBtn.addEventListener('click', () => {
            if (!hasLiked) {
            likesCount++;
            likeBtn.setAttribute('aria-pressed', 'true');
            } else {
            likesCount--;
            likeBtn.setAttribute('aria-pressed', 'false');
            }
            hasLiked = !hasLiked;
            likeBtn.textContent = `${likesCount} ❤`;

            // Mise à jour du total des likes dans le sticky summary
            const totalLikesEl = document.querySelector('.total-likes-count');
            if (totalLikesEl) {
            const delta = hasLiked ? +1 : -1;
            const currentTotal = parseInt(totalLikesEl.textContent, 10);
            totalLikesEl.textContent = currentTotal + delta;
            }
        });

        info.appendChild(titleEl);
        info.appendChild(likeBtn);
        article.appendChild(info);

        return article;
    }

    return { getMediaCardDOM };
}
