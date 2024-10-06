import pygame
import random
import sys
from constants import *
from games.clouds import Cloud
from games import clouds
from games import earth

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
        self.rover_size = (200, 200)
        self.rover1 = pygame.transform.scale(self.rover1, self.rover_size)
        self.rover2 = pygame.transform.scale(self.rover2, self.rover_size)
        self.rover_images = [self.rover1, self.rover2]
        self.travel_distance = 5

        self.dir = -1

        self.rover_y = HEIGHT // 2
        self.rover_x = WIDTH // 2 - self.rover_size[0] // 2
        self.target = self.rover_y
        
        # Load text images
        self.text_images_original = [pygame.image.load(f'assets/text{i}.jpg') for i in range(1, 18)]
        self.text_images_size = (400, 200)
        self.text_images = []
        for img in self.text_images_original:
            img = pygame.transform.scale(img, self.text_images_size)
            self.text_images.append(img)

        # Load language message
        self.text_language = pygame.image.load('assets/language.jpg')
        self.text_language_size = (400, 200)
        self.text_language = pygame.transform.scale(self.text_language, self.text_language_size)

        # Load location message
        self.text_location = pygame.image.load('assets/location.jpg')
        self.text_location_size = (400, 200)
        self.text_location = pygame.transform.scale(self.text_location, self.text_location_size)

        # Load name message
        self.text_name = pygame.image.load('assets/name.jpg')
        self.text_name_size = (400, 200)
        self.text_name = pygame.transform.scale(self.text_name, self.text_name_size)
        
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

        # Planet variables
        self.planet_cloud = random.choice(self.clouds)
        self.planet_pos = (
            self.planet_cloud.rect.x + random.randint(0, self.planet_cloud.rect.width),
            self.planet_cloud.rect.y + random.randint(0, self.planet_cloud.rect.height)
        )
        self.planet_found = False

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

    def animate_rover(self):
        current_time = pygame.time.get_ticks()

        if current_time - self.animation_timer > self.animation_speed:
            self.current_rover = (self.current_rover + 1) % len(self.rover_images)
            self.animation_timer = current_time

            self.rover_y += self.dir * 2

            if self.dir == -1 and self.rover_y < self.target - self.travel_distance:
                self.dir = 1
                self.travel_distance = min(0.2, random.random()) * 5.0
            elif self.dir == 1 and self.rover_y >= self.target + self.travel_distance:
                self.dir = -1
                self.travel_distance = min(0.2, random.random()) * 5.0

    def draw_rover(self, x, y):
        self.rover_x = x
        self.target = self.rover_y = y
        screen.blit(self.rover_images[self.current_rover], (self.rover_x, self.rover_y))

    def draw_text_image(self, x, y):
        screen.blit(self.text_images[self.current_text], (600, 60))

    def draw_clouds(self):
        for cloud in self.clouds:
            cloud.draw(screen)

    def draw_planet(self):
        if not self.planet_cloud.rect.collidepoint(self.planet_pos):
            pygame.draw.circle(screen, RED, self.planet_pos, 5)

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
                            self.current_text = 1
                        elif self.state == 'SELECT':
                            self.state = 'TERMINAL'
                            self.current_text = 2
                        elif self.state == 'TERMINAL':
                            self.current_text += 1
                            if self.current_text >= 13 and self.terminal_state == 'STATIC':
                                self.terminal_state = 'ANIMATED'
                            if self.current_text >= 15:
                                self.state = 'CLOUDS'
                                self.current_module = clouds
                        elif self.state == 'CLOUDS' and self.planet_found:
                            self.state = 'EARTH'
                            self.current_module = earth
                        elif self.state == 'EARTH':
                            self.current_module.next_image()
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
                self.draw_planet()
                if not self.planet_cloud.rect.collidepoint(self.planet_pos):
                    self.planet_found = True
            elif self.state == 'EARTH':
                self.current_module.draw(screen)

            self.animate_rover()

            # Draw rover and text
            if self.state in ['START', 'SELECT', 'TERMINAL']:
                text_image = self.text_images[self.current_text]
                text_x = WIDTH // 2 - text_image.get_width() // 2
                text_y = HEIGHT // 2 - text_image.get_height() // 2
                
                rover_x = 400
                rover_y = 60
                
                self.draw_rover(rover_x, rover_y)
                self.draw_text_image(text_x, text_y)

                if self.state == 'SELECT':
                    screen.blit(self.text_language, (100, 400))
                    screen.blit(self.text_location, (500, 400))
                    screen.blit(self.text_name, (900, 400))

            pygame.display.flip()
            clock.tick(60)

if __name__ == '__main__':
    pygame.init()
    font = pygame.font.Font(None, 36)
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Space Game")
    game = SpaceGame()
    game.play()