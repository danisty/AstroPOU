import pygame
import sys
import random

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
DARK_GRAY = (50, 50, 50, 200)  # Semi-transparent dark gray

# Messages
WELCOME_MSG = "Welcome, fellow terrestrial!"

# Initialize Pygame
pygame.init()

# Fonts
font = pygame.font.Font(None, 32)
big_font = pygame.font.Font(None, 48)

# Set up display
WIDTH, HEIGHT = 1366, 768
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption(WELCOME_MSG)

class SpaceGame:
    def __init__(self):
        self.state = "START"
        
        # Load background images
        self.background1 = pygame.image.load("background1.jpg")
        self.background1 = pygame.transform.scale(self.background1, (WIDTH, HEIGHT))

        self.background2 = pygame.image.load("background2.jpg")
        self.background2 = pygame.transform.scale(self.background2, (WIDTH, HEIGHT))
        
        # Load and resize rover images
        self.rover1 = pygame.image.load("rover1.jpg")
        self.rover2 = pygame.image.load("rover2.jpg")
        self.rover_size = (150, 150)  # Adjust this size as needed
        self.rover1 = pygame.transform.scale(self.rover1, self.rover_size)
        self.rover2 = pygame.transform.scale(self.rover2, self.rover_size)
        self.rover_images = [self.rover1, self.rover2]
        self.current_rover = 0
        self.animation_timer = 0
        self.animation_speed = 200  # milliseconds

        # Create star field
        self.stars = [(random.randint(0, WIDTH), random.randint(0, HEIGHT)) for _ in range(100)]

        # User information
        self.language = "English"
        self.location = "Spain"
        self.name = "AstroPOU"

    def draw_text(self, text, font, color, x, y, align="center"):
        text_surface = font.render(text, True, color)
        text_rect = text_surface.get_rect()
        if align == "center":
            text_rect.center = (x, y)
        elif align == "left":
            text_rect.midleft = (x, y)
        screen.blit(text_surface, text_rect)

    def draw_centered_text(self, text, font, color, x, y, width):
        text_surface = font.render(text, True, color)
        text_rect = text_surface.get_rect()
        text_rect.center = (x + width // 2, y)
        screen.blit(text_surface, text_rect)
        return text_rect.bottom

    def draw_stars(self):
        for star in self.stars:
            pygame.draw.circle(screen, WHITE, star, 1)

    def update_stars(self):
        self.stars = [((x + 1) % WIDTH, (y + 1) % HEIGHT) for x, y in self.stars]

    def draw_selection_square(self, x, y, width, height, label, value):
        # Draw opaque background
        background_surface = pygame.Surface((width, height), pygame.SRCALPHA)
        background_surface.fill(DARK_GRAY)
        screen.blit(background_surface, (x, y))
        
        # Draw border
        pygame.draw.rect(screen, WHITE, (x, y, width, height), 2)
        
        # Draw label
        label_bottom = self.draw_centered_text(label, font, WHITE, x, y + 20, width)
        
        # Draw underline
        pygame.draw.line(screen, WHITE, (x + 10, label_bottom + 5), (x + width - 10, label_bottom + 5), 2)
        
        # Draw value
        self.draw_text(value, font, WHITE, x + width // 2, label_bottom + 35, "center")
        
        # Draw down arrow
        arrow_points = [(x + width // 2, y + height - 20),
                        (x + width // 2 - 10, y + height - 30),
                        (x + width // 2 + 10, y + height - 30)]
        pygame.draw.polygon(screen, WHITE, arrow_points)

    def animate_rover(self):
        current_time = pygame.time.get_ticks()
        if current_time - self.animation_timer > self.animation_speed:
            self.current_rover = (self.current_rover + 1) % len(self.rover_images)
            self.animation_timer = current_time

    def draw_rover(self, x, y):
        screen.blit(self.rover_images[self.current_rover], (x, y))

    def draw_speech_bubble(self, text, x, y, width, height):
        # Draw the main bubble
        pygame.draw.ellipse(screen, WHITE, (x, y, width, height))
        pygame.draw.ellipse(screen, BLACK, (x, y, width, height), 2)
        
        # Draw the text
        self.draw_text(text, font, BLACK, x + width // 2, y + height // 2)

    def play(self):
        clock = pygame.time.Clock()
        
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        pygame.quit()
                        sys.exit()
                    if event.key == pygame.K_SPACE:
                        if self.state == "START":
                            self.state = "SELECT"

            # Draw background1
            screen.blit(self.background1, (0, 0))
            
            # Draw and update stars
            self.draw_stars()
            self.update_stars()
            
            # Draw background2 on top of stars
            screen.blit(self.background2, (0, 0))

            # Animate rover
            self.animate_rover()

            if self.state == "START":
                # Draw rover
                rover_x, rover_y = WIDTH // 2 - self.rover_size[0] // 2, HEIGHT // 2
                self.draw_rover(rover_x, rover_y)
                
                # Draw speech bubble
                self.draw_speech_bubble(WELCOME_MSG, rover_x - 100, rover_y - 125, 400, 100)
                
                self.draw_text("Press SPACE to continue", font, WHITE, WIDTH // 2, HEIGHT - 100, "center")
                self.draw_text("Press ESC to quit", font, WHITE, WIDTH // 2, HEIGHT - 50, "center")
            elif self.state == "SELECT":
                # Draw rover
                rover_x, rover_y = WIDTH // 2 - self.rover_size[0] // 2, 50
                self.draw_rover(rover_x, rover_y)
                
                # Draw speech bubble (moved up)
                self.draw_speech_bubble("Please, tell me a little bit about yourself:", rover_x - 150, rover_y + self.rover_size[1] + 10, 500, 100)
                
                box_width, box_height = 400, 120
                box_spacing = 20
                total_height = 3 * box_height + 2 * box_spacing
                start_y = (HEIGHT - total_height) // 2 + 150  # Increased vertical offset

                # Draw language selection square
                self.draw_selection_square(WIDTH // 2 - box_width // 2, start_y, box_width, box_height, "What language do you speak?", self.language)
                
                # Draw location selection square
                self.draw_selection_square(WIDTH // 2 - box_width // 2, start_y + box_height + box_spacing, box_width, box_height, "Where are you located?", self.location)

                # Draw name input square
                self.draw_selection_square(WIDTH // 2 - box_width // 2, start_y + 2 * (box_height + box_spacing), box_width, box_height, "What's your name?", self.name)

            pygame.display.flip()
            clock.tick(60)

if __name__ == "__main__":
    game = SpaceGame()
    game.play()