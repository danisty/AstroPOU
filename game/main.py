import pygame
import random
import sys
from constants import *
from games.clouds import Cloud
from games import clouds

LANGUAGE_MSG = 'English'
COUNTRY_MSG = 'Spain'
NAME_MSG = 'AstroPOU'

class SpaceGame:
    def __init__(self):
        self.state = 'START'
        self.terminal_state = 'STATIC'
        self.current_module = None
        
        # Load and scale background images
        self.background1 = pygame.image.load('assets/background1.jpg')
        self.background1 = pygame.transform.scale(self.background1, (WIDTH, HEIGHT))
        self.background2 = pygame.image.load('assets/background2.jpg')
        self.background2 = pygame.transform.scale(self.background2, (WIDTH, HEIGHT))
        
        # Load and scale terminal images
        self.terminal1 = pygame.image.load('assets/terminal1.jpg')
        self.terminal1 = pygame.transform.scale(self.terminal1, (WIDTH, HEIGHT))
        self.terminal_images = [
            pygame.image.load('assets/terminal2.jpg'),
            pygame.image.load('assets/terminal3.jpg')
        ]
        self.terminal_images = [pygame.transform.scale(img, (WIDTH, HEIGHT)) for img in self.terminal_images]
        
        # Load and scale stars background image
        self.stars_background = pygame.image.load('assets/stars_background.jpg')
        self.stars_background = pygame.transform.scale(self.stars_background, (WIDTH, HEIGHT))
        
        # Load and scale rover images
        self.rover1 = pygame.image.load('assets/rover1.jpg')
        self.rover2 = pygame.image.load('assets/rover2.jpg')
        self.rover_size = (200, 200)  # Reduced size to avoid covering important background elements
        self.rover1 = pygame.transform.scale(self.rover1, self.rover_size)
        self.rover2 = pygame.transform.scale(self.rover2, self.rover_size)
        self.rover_images = [self.rover1, self.rover2]
        
        # Load text images (keep original size)
        self.text_images_original = [pygame.image.load(f'assets/text{i}.jpg') for i in range(1, 18)]
        self.text_images_size = (400, 200)
        self.text_images = []
        for img in self.text_images_original:
            img = pygame.transform.scale(img, self.text_images_size)
            self.text_images.append(img)
        
        # Animation variables
        self.current_rover = 0
        self.current_text = 0
        self.animation_timer = 0
        self.animation_speed = 100  # milliseconds

        # Load cloud images and create Cloud objects
        cloud_images = [pygame.image.load(f'assets/cloud{i}.jpg') for i in range(1, 7)]
        self.clouds = []
        for _ in range(15):
            img = random.choice(cloud_images)
            x = random.randint(0, WIDTH - img.get_width())
            y = random.randint(0, HEIGHT - img.get_height())
            self.clouds.append(Cloud(img, x, y))

        # Create star field
        self.stars = [(random.randint(0, WIDTH), random.randint(0, HEIGHT)) for _ in range(100)]

        # User information
        self.language = LANGUAGE_MSG
        self.location = COUNTRY_MSG
        self.name = NAME_MSG

    def draw_text(self, text, font, color, x, y, align='center'):
        text_surface = font.render(text, True, color)
        text_rect = text_surface.get_rect()
        if align == 'center':
            text_rect.center = (x, y)
        elif align == 'left':
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
        background_surface = pygame.Surface((width, height), pygame.SRCALPHA)
        background_surface.fill(DARK_GRAY)
        screen.blit(background_surface, (x, y))
        pygame.draw.rect(screen, WHITE, (x, y, width, height), 2)
        label_bottom = self.draw_centered_text(label, font, WHITE, x, y + 20, width)
        pygame.draw.line(screen, WHITE, (x + 10, label_bottom + 5), (x + width - 10, label_bottom + 5), 2)
        self.draw_text(value, font, WHITE, x + width // 2, label_bottom + 35, 'center')
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
        screen.blit(self.rover_images[self.current_rover], (400, 60))

    def draw_text_image(self, x, y):
        screen.blit(self.text_images[self.current_text], (600, 60))

    def draw_clouds(self):
        for cloud in self.clouds:
            cloud.draw(screen)

    def play(self):
        clock = pygame.time.Clock()
        
        while True:
            mouse_pos = pygame.mouse.get_pos()
            
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        pygame.quit()
                        sys.exit()
                    if event.key == pygame.K_SPACE:
                        if self.state == 'START':
                            self.state = 'SELECT'
                            self.current_text = 1  # Move to the next text image
                        elif self.state == 'SELECT':
                            self.state = 'TERMINAL'
                            self.current_text = 2  # Start terminal texts
                        elif self.state == 'TERMINAL':
                            self.current_text += 1
                            if self.current_text >= 13 and self.terminal_state == 'STATIC':
                                self.terminal_state = 'ANIMATED'
                            if self.current_text > 17:
                                self.state = 'CLOUDS'
                                self.current_module = clouds
                if self.current_module:
                    self.current_module.run(self, event)

            # Draw background elements
            if self.state in ['START', 'SELECT']:
                screen.blit(self.background1, (0, 0))
                self.draw_stars()
                self.update_stars()
                screen.blit(self.background2, (0, 0))
            elif self.state == 'TERMINAL':
                if self.terminal_state == 'STATIC':
                    screen.blit(self.terminal1, (0, 0))
                else:
                    screen.blit(self.terminal_images[self.current_rover], (0, 0))
            elif self.state == 'CLOUDS':
                screen.blit(self.stars_background, (0, 0))
                for cloud in self.clouds:
                    cloud.update(mouse_pos)
                self.draw_clouds()

            self.animate_rover()

            # Draw rover and text
            if self.state in ['START', 'SELECT', 'TERMINAL']:
                text_image = self.text_images[self.current_text]
                text_x = WIDTH // 2 - text_image.get_width() // 2
                text_y = HEIGHT // 2 - text_image.get_height() // 2
                
                # Position rover in the bottom left corner
                rover_x = 20
                rover_y = HEIGHT - self.rover_size[1] - 20
                
                self.draw_rover(rover_x, rover_y)
                self.draw_text_image(text_x, text_y)

                if self.state == 'SELECT':
                    box_width, box_height = 400, 120
                    box_spacing = 20
                    total_height = 3 * box_height + 2 * box_spacing
                    start_y = text_y + text_image.get_height() + 50

                    self.draw_selection_square(500, 300, box_width, box_height, 'What language do you speak?', self.language)
                    self.draw_selection_square(500, 300 + box_height + box_spacing, box_width, box_height, 'Where are you located?', self.location)
                    self.draw_selection_square(500, 300 + 2 * (box_height + box_spacing), box_width, box_height, "What's your name?", self.name)

            pygame.display.flip()
            clock.tick(60)

if __name__ == '__main__':
    pygame.init()
    font = pygame.font.Font(None, 36)
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Space Game")
    game = SpaceGame()
    game.play()