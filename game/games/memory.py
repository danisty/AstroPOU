import random
from constants import *

SPACE_BLACK = (5, 5, 15)
STAR_WHITE = (255, 255, 255)

class ExoplanetCard:
    def __init__(self, name, image, x, y, width, height):
        self.name = name
        self.front_image = pygame.transform.scale(image, (width, height))
        self.back_image = pygame.image.load('assets/tarjeta_oculta.png')
        self.back_image = pygame.transform.scale(self.back_image, (width, height))
        self.rect = pygame.Rect(x, y, width, height)
        self.is_flipped = False
        self.is_matched = False

    def draw(self, surface):
        if self.is_flipped:
            surface.blit(self.front_image, self.rect)
            font = pygame.font.Font(None, 24)
            text = font.render(self.name, True, WHITE)
            text_rect = text.get_rect(center=(self.rect.centerx, self.rect.bottom - 20))
            surface.blit(text, text_rect)
        else:
            surface.blit(self.back_image, self.rect)

    def flip(self):
        self.is_flipped = not self.is_flipped

class MemoryGame:
    def __init__(self, screen_width, screen_height):
        self.screen_width = screen_width
        self.screen_height = screen_height
        self.cards = []
        self.selected_cards = []
        self.can_select = True
        self.game_over = False
        self.setup_game()

    def setup_game(self):
        exoplanets = [
            ('TRAPPIST-1e', 'assets/exoplaneta.png'),
            ('Kepler-186f', 'assets/exoplaneta2.png'),
            ('Proxima Centauri b', 'assets/exoplaneta1.png'),
            ('HD 40307g', 'assets/exoplaneta3.png'),
            ('Kepler-442b', 'assets/exoplaneta.png'),
            ('K2-18b', 'assets/exoplaneta1.png'),
            ('TOI 700d', 'assets/exoplaneta2.png'),
            ('LHS 1140b', 'assets/exoplaneta3.png')
        ]

        cards_per_row = 4
        rows = 4
        card_width = 150
        card_height = 150
        margin_x = 20
        margin_y = 20

        start_x = (self.screen_width - (cards_per_row * card_width + (cards_per_row - 1) * margin_x)) // 2
        start_y = (self.screen_height - (rows * card_height + (rows - 1) * margin_y)) // 2

        shuffled_exoplanets = exoplanets * 2
        random.shuffle(shuffled_exoplanets)

        for i, (name, image_path) in enumerate(shuffled_exoplanets):
            row = i // cards_per_row
            col = i % cards_per_row
            x = start_x + col * (card_width + margin_x)
            y = start_y + row * (card_height + margin_y)
            image = pygame.image.load(image_path)
            card = ExoplanetCard(name, image, x, y, card_width, card_height)
            self.cards.append(card)

    def draw(self, surface):
        for card in self.cards:
            card.draw(surface)

        if self.game_over:
            font = pygame.font.Font(None, 64)
            text = font.render('¡Misión Cumplida!', True, WHITE)
            text_rect = text.get_rect(center=(self.screen_width // 2, self.screen_height // 2))
            surface.blit(text, text_rect)

    def handle_click(self, pos):
        if self.game_over or not self.can_select:
            return

        for card in self.cards:
            if card.rect.collidepoint(pos) and not card.is_flipped and not card.is_matched:
                card.flip()
                self.selected_cards.append(card)
                
                if len(self.selected_cards) == 2:
                    self.can_select = False
                    pygame.time.set_timer(pygame.USEREVENT, 1000)

    def check_match(self):
        if len(self.selected_cards) == 2:
            if self.selected_cards[0].name == self.selected_cards[1].name:
                self.selected_cards[0].is_matched = True
                self.selected_cards[1].is_matched = True
            else:
                self.selected_cards[0].flip()
                self.selected_cards[1].flip()
            
            self.selected_cards = []
            self.can_select = True

        if all(card.is_matched for card in self.cards):
            self.game_over = True

memory_game = MemoryGame(WIDTH, HEIGHT)

def run(game, event):
    if event.type == pygame.MOUSEBUTTONDOWN:
        memory_game.handle_click(event.pos)
    elif event.type == pygame.USEREVENT:
        pygame.time.set_timer(pygame.USEREVENT, 0)
        memory_game.check_match()

def draw(surface):
    surface.fill(SPACE_BLACK)
    memory_game.draw(surface)