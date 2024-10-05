import pygame
import sys

# Initialize Pygame
pygame.init()

# Set up the display
WIDTH, HEIGHT = 1366, 768
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Exoplanet Adventure")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Fonts
font = pygame.font.Font(None, 32)

class Game:
    def __init__(self):
        self.current_scene = "intro"
        self.score = 0

    def run(self):
        while True:
            if self.current_scene == "intro":
                self.intro_scene()
            elif self.current_scene == "quiz":
                self.quiz_scene()
            elif self.current_scene == "ending":
                self.ending_scene()

    def intro_scene(self):
        text = [
            "Welcome to Exoplanet Adventure!",
            "You are an astronomer on a mission to discover new exoplanets.",
            "Your journey will take you through the vastness of space,",
            "where you'll learn about different types of exoplanets",
            "and the methods used to detect them.",
            "",
            "Are you ready to begin your adventure?",
            "",
            "Press SPACE to start or Q to quit."
        ]

        self.display_text(text)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    self.current_scene = "quiz"
                elif event.key == pygame.K_q:
                    pygame.quit()
                    sys.exit()

    def quiz_scene(self):
        questions = [
            {
                "question": "What is an exoplanet?",
                "options": ["A. A planet in our solar system", "B. A planet orbiting a star other than the Sun", "C. A dwarf planet", "D. An asteroid"],
                "correct": "B"
            },
            {
                "question": "Which method is commonly used to detect exoplanets?",
                "options": ["A. Direct imaging", "B. Radio telescopes", "C. Transit method", "D. X-ray detection"],
                "correct": "C"
            },
            {
                "question": "What type of exoplanet is often called a 'Hot Jupiter'?",
                "options": ["A. A small, rocky planet", "B. A gas giant orbiting close to its star", "C. An ice giant", "D. A planet with a thick atmosphere"],
                "correct": "B"
            }
        ]

        for question in questions:
            self.display_question(question)
            pygame.display.flip()

            waiting_for_answer = True
            while waiting_for_answer:
                for event in pygame.event.get():
                    if event.type == pygame.QUIT:
                        pygame.quit()
                        sys.exit()
                    if event.type == pygame.KEYDOWN:
                        if event.key in [pygame.K_a, pygame.K_b, pygame.K_c, pygame.K_d]:
                            answer = chr(event.key).upper()
                            if answer == question["correct"]:
                                self.score += 1
                            waiting_for_answer = False

        self.current_scene = "ending"

    def ending_scene(self):
        text = [
            f"Congratulations! You've completed your exoplanet adventure!",
            f"Your final score: {self.score} out of 3",
            "",
            "Press Q to quit or R to restart."
        ]

        self.display_text(text)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_q:
                    pygame.quit()
                    sys.exit()
                elif event.key == pygame.K_r:
                    self.__init__()
                    self.current_scene = "intro"

    def display_text(self, text_lines):
        screen.fill(BLACK)
        y = 50
        for line in text_lines:
            text_surface = font.render(line, True, WHITE)
            text_rect = text_surface.get_rect(center=(WIDTH/2, y))
            screen.blit(text_surface, text_rect)
            y += 40
        pygame.display.flip()

    def display_question(self, question):
        screen.fill(BLACK)
        y = 50
        question_text = font.render(question["question"], True, WHITE)
        question_rect = question_text.get_rect(center=(WIDTH/2, y))
        screen.blit(question_text, question_rect)
        y += 60

        for option in question["options"]:
            option_text = font.render(option, True, WHITE)
            option_rect = option_text.get_rect(center=(WIDTH/2, y))
            screen.blit(option_text, option_rect)
            y += 40

if __name__ == "__main__":
    game = Game()
    game.run()