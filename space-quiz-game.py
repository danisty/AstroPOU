import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Set up display
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Space Quiz Game")

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
YELLOW = (255, 255, 0)

# Fonts
font = pygame.font.Font(None, 36)
big_font = pygame.font.Font(None, 48)

class SpaceQuizGame:
    def __init__(self):
        self.questions = [
            {
                "question": "What is the largest planet in our solar system?",
                "options": ["Mars", "Jupiter", "Saturn", "Neptune"],
                "correct": 1
            },
            {
                "question": "Which planet is known as the Red Planet?",
                "options": ["Venus", "Mars", "Mercury", "Uranus"],
                "correct": 1
            },
            {
                "question": "What is the name of the galaxy we live in?",
                "options": ["Andromeda", "Milky Way", "Sombrero", "Whirlpool"],
                "correct": 1
            },
            {
                "question": "What is the closest star to Earth?",
                "options": ["Proxima Centauri", "Alpha Centauri", "Sirius", "The Sun"],
                "correct": 3
            },
            {
                "question": "What is the name of the force that pulls objects towards each other?",
                "options": ["Magnetism", "Electricity", "Gravity", "Nuclear Force"],
                "correct": 2
            }
        ]
        self.score = 0
        self.current_question = 0
        self.time_limit = 10  # seconds per question
        self.timer = 0
        self.state = "START"
        
        # Load space background image
        self.background = pygame.image.load("space_background.jpg")
        self.background = pygame.transform.scale(self.background, (WIDTH, HEIGHT))
        
        # Create star field
        self.stars = [(random.randint(0, WIDTH), random.randint(0, HEIGHT)) for _ in range(100)]

    def draw_text(self, text, font, color, x, y):
        text_surface = font.render(text, True, color)
        text_rect = text_surface.get_rect()
        text_rect.center = (x, y)
        screen.blit(text_surface, text_rect)

    def draw_button(self, text, x, y, w, h, color, text_color):
        pygame.draw.rect(screen, color, (x, y, w, h))
        self.draw_text(text, font, text_color, x + w // 2, y + h // 2)

    def draw_stars(self):
        for star in self.stars:
            pygame.draw.circle(screen, WHITE, star, 1)

    def update_stars(self):
        self.stars = [(x, (y + 1) % HEIGHT) for x, y in self.stars]

    def draw_question(self):
        question = self.questions[self.current_question]
        self.draw_text(question["question"], font, WHITE, WIDTH // 2, 100)
        
        for i, option in enumerate(question["options"]):
            self.draw_button(option, 100, 200 + i * 80, WIDTH - 200, 60, BLUE, WHITE)

    def draw_timer(self):
        pygame.draw.rect(screen, RED, (50, 50, (WIDTH - 100) * (self.timer / self.time_limit), 20))

    def play(self):
        clock = pygame.time.Clock()
        
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                if event.type == pygame.MOUSEBUTTONDOWN:
                    if self.state == "START":
                        self.state = "PLAY"
                        self.timer = self.time_limit
                    elif self.state == "PLAY":
                        mouse_pos = pygame.mouse.get_pos()
                        for i in range(4):
                            if 100 <= mouse_pos[0] <= WIDTH - 100 and 200 + i * 80 <= mouse_pos[1] <= 260 + i * 80:
                                self.check_answer(i)
                    elif self.state == "END":
                        self.reset_game()

            screen.blit(self.background, (0, 0))
            self.draw_stars()
            self.update_stars()

            if self.state == "START":
                self.draw_text("Space Quiz Game", big_font, WHITE, WIDTH // 2, HEIGHT // 2 - 50)
                self.draw_button("Start", WIDTH // 2 - 100, HEIGHT // 2 + 50, 200, 60, GREEN, WHITE)
            elif self.state == "PLAY":
                self.draw_question()
                self.draw_timer()
                self.timer -= 1 / 60  # Assuming 60 FPS
                if self.timer <= 0:
                    self.check_answer(None)
            elif self.state == "END":
                self.draw_text(f"Game Over! Your score: {self.score}/{len(self.questions)}", big_font, WHITE, WIDTH // 2, HEIGHT // 2 - 50)
                self.draw_button("Play Again", WIDTH // 2 - 100, HEIGHT // 2 + 50, 200, 60, GREEN, WHITE)

            pygame.display.flip()
            clock.tick(60)

    def check_answer(self, answer):
        question = self.questions[self.current_question]
        if answer == question["correct"]:
            self.score += 1
        
        self.current_question += 1
        if self.current_question < len(self.questions):
            self.timer = self.time_limit
        else:
            self.state = "END"

    def reset_game(self):
        self.score = 0
        self.current_question = 0
        random.shuffle(self.questions)
        self.state = "PLAY"
        self.timer = self.time_limit

if __name__ == "__main__":
    game = SpaceQuizGame()
    game.play()
