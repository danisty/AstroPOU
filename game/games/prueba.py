import pygame
import random
import time
import sys

# Inicializar Pygame
pygame.init()

# Configuración de la pantalla
SCREEN_INFO = pygame.display.Info()
WINDOW_WIDTH = SCREEN_INFO.current_w
WINDOW_HEIGHT = SCREEN_INFO.current_h

# Configuración del juego
CARDS_PER_ROW = 4
ROWS = 4

# Calculamos el tamaño máximo que pueden tener las cartas
MARGIN_PERCENTAGE = 0.15
PLAYABLE_WIDTH = WINDOW_WIDTH * (1 - 2 * MARGIN_PERCENTAGE)
PLAYABLE_HEIGHT = WINDOW_HEIGHT * (1 - 2 * MARGIN_PERCENTAGE)

# Reducimos ligeramente el tamaño de las cartas
SPACE_BETWEEN_CARDS_FACTOR = 0.3
CARD_WIDTH = int(PLAYABLE_WIDTH / (CARDS_PER_ROW * (1 + SPACE_BETWEEN_CARDS_FACTOR)) * 0.9)
CARD_HEIGHT = int(PLAYABLE_HEIGHT / (ROWS * (1 + SPACE_BETWEEN_CARDS_FACTOR)) * 0.9)

# Clase para manejar el campo de estrellas
class StarField:
    def __init__(self):
        self.stars = []
        self.colors = [(255, 255, 255), (200, 200, 255), (255, 200, 200)]
        for _ in range(200):
            x = random.randint(0, WINDOW_WIDTH)
            y = random.randint(0, WINDOW_HEIGHT)
            speed = random.uniform(0.1, 0.5)
            size = random.randint(1, 3)
            color = random.choice(self.colors)
            self.stars.append([x, y, speed, size, color])

    def update(self):
        for star in self.stars:
            star[0] -= star[2]
            if star[0] < 0:
                star[0] = WINDOW_WIDTH
                star[1] = random.randint(0, WINDOW_HEIGHT)

    def draw(self, surface):
        for star in self.stars:
            x, y, _, size, color = star
            pygame.draw.circle(surface, color, (int(x), int(y)), size)

# Cargar y redimensionar imágenes
try:
    CARD_FRAME_ORIGINAL = pygame.image.load('assets/tarjeta_vuelta.png')
    CARD_BACK_ORIGINAL = pygame.image.load('assets/tarjeta_oculta.png')
    
    original_ratio = CARD_FRAME_ORIGINAL.get_width() / CARD_FRAME_ORIGINAL.get_height()
    
    if CARD_WIDTH / CARD_HEIGHT > original_ratio:
        CARD_WIDTH = int(CARD_HEIGHT * original_ratio)
    else:
        CARD_HEIGHT = int(CARD_WIDTH / original_ratio)
    
    CARD_FRAME = pygame.transform.smoothscale(CARD_FRAME_ORIGINAL, (CARD_WIDTH, CARD_HEIGHT))
    CARD_BACK = pygame.transform.smoothscale(CARD_BACK_ORIGINAL, (CARD_WIDTH, CARD_HEIGHT))
    
except Exception as e:
    print(f"Error al cargar las imágenes: {e}")
    pygame.quit()
    sys.exit()

# Recalcular márgenes después del ajuste de proporción
MARGIN_X = int(CARD_WIDTH * SPACE_BETWEEN_CARDS_FACTOR)
MARGIN_Y = int(CARD_HEIGHT * SPACE_BETWEEN_CARDS_FACTOR)

TOTAL_WIDTH = CARDS_PER_ROW * CARD_WIDTH + (CARDS_PER_ROW - 1) * MARGIN_X
TOTAL_HEIGHT = ROWS * CARD_HEIGHT + (ROWS - 1) * MARGIN_Y
START_X = (WINDOW_WIDTH - TOTAL_WIDTH) // 2
START_Y = (WINDOW_HEIGHT - TOTAL_HEIGHT) // 2

# Colores
SPACE_BLACK = (5, 5, 15)
STAR_WHITE = (255, 255, 255)

# Crear la ventana
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT), pygame.FULLSCREEN)

# Crear campo de estrellas
star_field = StarField()

# Lista de exoplanetas (con nombres y rutas a las imágenes)
EXOPLANETS = [
    ('TRAPPIST-1e', 'assets/exoplaneta.png'),
    ('Kepler-186f', 'assets/exoplaneta2.png'),
    ('Proxima Centauri b', 'assets/exoplaneta1.png'),
    ('HD 40307g', 'assets/exoplaneta3.png'),
    ('Kepler-442b', 'assets/exoplaneta.png'),
    ('K2-18b', 'assets/exoplaneta1.png'),
    ('TOI 700d', 'assets/exoplaneta2.png'),
    ('LHS 1140b', 'assets/exoplaneta3.png')
]

# Cargar imágenes de exoplanetas y redimensionarlas al tamaño adecuado para las cartas
exoplanet_images = []
for exoplanet in EXOPLANETS:
    image = pygame.image.load(exoplanet[1])
    image = pygame.transform.smoothscale(image, (int(CARD_WIDTH * 0.5), int(CARD_HEIGHT * 0.5)))  # Redimensiona la imagen al 80% del ancho y 60% del alto de la carta
    exoplanet_images.append(image)

# Crear lista de cartas
cards = list(range(len(EXOPLANETS))) * 2
random.shuffle(cards)

# Estado de las cartas
card_states = [False] * len(cards)
matched_cards = [False] * len(cards)
selected_cards = []
can_select = True

def draw_card(surface, x, y, card_index):
    """Dibuja una carta (frente o reverso)"""
    if card_states[card_index]:  # Carta boca arriba
        surface.blit(CARD_FRAME, (x, y))
        
        # Obtener imagen del exoplaneta correspondiente
        planet_image = exoplanet_images[cards[card_index]]
        image_rect = planet_image.get_rect(center=(x + CARD_WIDTH / 2, y + CARD_HEIGHT / 2 - CARD_HEIGHT * 0.10))  # Centramos la imagen verticalmente un poco más arriba
        surface.blit(planet_image, image_rect)
        
        # Mostrar nombre del planeta
        planet_name = EXOPLANETS[cards[card_index]][0]
        font_size = int(CARD_HEIGHT * 0.12)
        font = pygame.font.Font(None, font_size)
        text = font.render(planet_name, True, STAR_WHITE)
        text_rect = text.get_rect(center=(x + CARD_WIDTH // 2, y + CARD_HEIGHT - 20))  # Posicionamos el texto en la parte inferior
        surface.blit(text, text_rect)
    else:  # Carta boca abajo
        surface.blit(CARD_BACK, (x, y))

def draw_cards():
    """Dibuja todas las cartas en la pantalla"""
    for i in range(len(cards)):
        if matched_cards[i]:
            continue
        row = i // CARDS_PER_ROW
        col = i % CARDS_PER_ROW
        x = START_X + col * (CARD_WIDTH + MARGIN_X)
        y = START_Y + row * (CARD_HEIGHT + MARGIN_Y)
        draw_card(screen, x, y, i)

def check_click(pos):
    """Verifica si se hizo clic en una carta"""
    if not can_select:
        return
    
    for i in range(len(cards)):
        if matched_cards[i]:
            continue
        row = i // CARDS_PER_ROW
        col = i % CARDS_PER_ROW
        x = START_X + col * (CARD_WIDTH + MARGIN_X)
        y = START_Y + row * (CARD_HEIGHT + MARGIN_Y)
        
        card_rect = pygame.Rect(x, y, CARD_WIDTH, CARD_HEIGHT)
        if card_rect.collidepoint(pos) and not card_states[i] and not matched_cards[i]:
            handle_card_selection(i)
            break

def handle_card_selection(index):
    """Maneja la selección de cartas"""
    global can_select
    
    if len(selected_cards) < 2 and not card_states[index]:
        card_states[index] = True
        selected_cards.append(index)
        
        if len(selected_cards) == 2:
            can_select = False
            pygame.time.set_timer(pygame.USEREVENT, 1000)

def check_match():
    """Verifica si las cartas coinciden"""
    global can_select, selected_cards
    
    if cards[selected_cards[0]] == cards[selected_cards[1]]:
        matched_cards[selected_cards[0]] = True
        matched_cards[selected_cards[1]] = True
    else:
        card_states[selected_cards[0]] = False
        card_states[selected_cards[1]] = False
    
    selected_cards = []
    can_select = True

def main():
    """Función principal del juego"""
    running = True
    clock = pygame.time.Clock()
    
    while running:
        screen.fill(SPACE_BLACK)
        
        # Actualizar y dibujar campo de estrellas
        star_field.update()
        star_field.draw(screen)
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT or (event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE):
                running = False
            elif event.type == pygame.MOUSEBUTTONDOWN and can_select:
                check_click(event.pos)
            elif event.type == pygame.USEREVENT:
                pygame.time.set_timer(pygame.USEREVENT, 0)
                check_match()
        
        draw_cards()
        
        if all(matched_cards):
            font = pygame.font.Font(None, int(WINDOW_WIDTH * 0.08))
            text = font.render('¡Misión Cumplida!', True, STAR_WHITE)
            text_rect = text.get_rect(center=(WINDOW_WIDTH//2, WINDOW_HEIGHT//2))
            screen.blit(text, text_rect)
            pygame.display.flip()
            time.sleep(3)
            running = False
        
        pygame.display.flip()
        clock.tick(60)
    
    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
