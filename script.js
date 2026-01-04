// ========== FUNÇÃO: GERAR OPÇÕES DE DOWNLOAD POR PLATAFORMA ==========
function generateDownloadOptions(game) {
    const platformsContainer = document.getElementById('downloadPlatforms');
    if (!platformsContainer) return;
    
    // Plataformas disponíveis do jogo
    const availablePlatforms = game.platforms?.map(p => p.platform.name.toLowerCase()) || [];
    
    // Mapeamento de plataformas para dados
    const platformData = {
        'android': {
            name: 'Android',
            icon: 'fab fa-android',
            color: '#3DDC84',
            versions: ['APK', 'OBB'],
            requirements: 'Android 8.0+, 2GB RAM',
            stores: ['Google Play', 'APKPure', 'Aptoide']
        },
        'ios': {
            name: 'iOS',
            icon: 'fab fa-apple',
            color: '#000000',
            versions: ['IPA'],
            requirements: 'iOS 13.0+, iPhone 8+',
            stores: ['App Store', 'TestFlight']
        },
        'pc': {
            name: 'Windows PC',
            icon: 'fab fa-windows',
            color: '#0078D6',
            versions: ['EXE', 'ZIP', 'Instalador'],
            requirements: 'Windows 10, 8GB RAM, DirectX 11',
            stores: ['Steam', 'Epic Games', 'GOG']
        },
        'mac': {
            name: 'macOS',
            icon: 'fab fa-apple',
            color: '#000000',
            versions: ['DMG', 'APP'],
            requirements: 'macOS 10.15+, 8GB RAM',
            stores: ['App Store', 'Steam', 'Epic Games']
        },
        'linux': {
            name: 'Linux',
            icon: 'fab fa-linux',
            color: '#FCC624',
            versions: ['DEB', 'RPM', 'AppImage'],
            requirements: 'Ubuntu 20.04+, 8GB RAM',
            stores: ['Steam', 'GOG', 'Itch.io']
        },
        'playstation': {
            name: 'PlayStation',
            icon: 'fab fa-playstation',
            color: '#003087',
            versions: ['PS5', 'PS4'],
            requirements: 'Console PlayStation, Internet',
            stores: ['PlayStation Store']
        },
        'xbox': {
            name: 'Xbox',
            icon: 'fab fa-xbox',
            color: '#107C10',
            versions: ['Xbox Series X/S', 'Xbox One'],
            requirements: 'Console Xbox, Internet',
            stores: ['Microsoft Store', 'Xbox Store']
        },
        'nintendo': {
            name: 'Nintendo Switch',
            icon: 'fab fa-nintendo-switch',
            color: '#E60012',
            versions: ['NSP', 'XCI'],
            requirements: 'Console Nintendo Switch',
            stores: ['Nintendo eShop']
        }
    };
    
    let html = '';
    
    // Verificar cada plataforma
    Object.entries(platformData).forEach(([key, data]) => {
        const isAvailable = availablePlatforms.some(p => 
            p.includes(key) || 
            (key === 'pc' && (p.includes('windows') || p.includes('pc'))) ||
            (key === 'playstation' && p.includes('playstation')) ||
            (key === 'xbox' && p.includes('xbox')) ||
            (key === 'nintendo' && p.includes('nintendo'))
        );
        
        const availabilityClass = isAvailable ? 'available' : 'unavailable';
        
        html += `
            <div class="download-platform-card ${availabilityClass}" data-platform="${key}">
                <div class="platform-card-header">
                    <div class="platform-icon" style="background: linear-gradient(135deg, ${data.color}, ${data.color}99);">
                        <i class="${data.icon}" style="color: white;"></i>
                    </div>
                    <div class="platform-info">
                        <h4>${data.name}</h4>
                        <div class="platform-version">${data.versions.join(', ')}</div>
                    </div>
                </div>
                
                <div class="download-links">
                    ${isAvailable ? 
                        data.stores.map(store => `
                            <a href="#" class="download-link" onclick="handleDownloadClick('${game.name}', '${data.name}', '${store}')">
                                <i class="fas fa-download"></i> Baixar via ${store}
                            </a>
                        `).join('') :
                        `<div class="download-link disabled">
                            <i class="fas fa-times-circle"></i> Não disponível para ${data.name}
                        </div>`
                    }
                </div>
                
                <div class="platform-requirements">
                    <strong><i class="fas fa-info-circle"></i> Requisitos:</strong> ${data.requirements}
                </div>
                
                ${!isAvailable ? 
                    `<div style="margin-top: 10px; padding: 8px; background: rgba(255,71,87,0.1); border-radius: 5px; font-size: 0.8rem; color: var(--danger-color);">
                        <i class="fas fa-exclamation-circle"></i> Esta plataforma não é oficialmente suportada
                    </div>` : ''
                }
            </div>
        `;
    });
    
    platformsContainer.innerHTML = html;
    
    // Adicionar filtros por plataforma
    const filterButtons = document.querySelectorAll('.platform-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            
            // Atualizar botões ativos
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar cards
            const cards = document.querySelectorAll('.download-platform-card');
            cards.forEach(card => {
                if (platform === 'all' || card.dataset.platform === platform) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}