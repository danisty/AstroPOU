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
        
        # Load background images
        self.background1 = pygame.image.load('assets/background1.jpg')
        self.background1 = pygame.transform.scale(self.background1, (WIDTH, HEIGHT))

        self.background2 = pygame.image.load('assets/background2.jpg')
        self.background2 = pygame.transform.scale(self.background2, (WIDTH, HEIGHT))
        
        # Load terminal images
        self.terminal1 = pygame.image.load('assets/terminal1.jpg')
        self.terminal1 = pygame.transform.scale(self.terminal1, (WIDTH, HEIGHT))
        self.terminal_images = [
            pygame.image.load('assets/terminal2.jpg'),
            pygame.image.load('assets/terminal3.jpg')
        ]
        self.terminal_images = [pygame.transform.scale(img, (WIDTH, HEIGHT)) for img in self.terminal_images]
        self.current_terminal = 0
        self.terminal_animation_timer = 0
        self.terminal_animation_speed = 200  # milliseconds

        # Load stars background image
        self.stars_background = pygame.image.load('assets/stars_background.jpg')
        self.stars_background = pygame.transform.scale(self.stars_background, (WIDTH, HEIGHT))
        
        # Load and resize rover images
        self.rover1 = pygame.image.load('assets/rover1.jpg')
        self.rover2 = pygame.image.load('assets/rover2.jpg')
        self.rover_size = (150, 150)  # Adjust this size as needed
        self.rover1 = pygame.transform.scale(self.rover1, self.rover_size)
        self.rover2 = pygame.transform.scale(self.rover2, self.rover_size)
        self.rover_images = [self.rover1, self.rover2]
        self.current_rover = 0
        self.animation_timer = 0
        self.animation_speed = 100  # milliseconds

        self.travel_distance = 5
        self.dir = -1

        self.rover_y = HEIGHT // 2
        self.rover_x = WIDTH // 2 - self.rover_size[0] // 2

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
        self.draw_text(value, font, WHITE, x + width // 2, label_bottom + 35, 'center')
        
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
            
            target = HEIGHT // 2

            self.rover_y += self.dir * 2

            if self.dir == -1 and self.rover_y < target - self.travel_distance:
                self.dir = 1
                self.travel_distance = min(0.2, random.random()) * 5.0
            elif self.dir == 1 and self.rover_y >= target + self.travel_distance:
                self.dir = -1
                self.travel_distance = min(0.2, random.random()) * 5.0

            screen.blit(self.rover_images[self.current_rover], (self.rover_x, self.rover_y))

    def draw_rover(self):
        screen.blit(self.rover_images[self.current_rover], (self.rover_x, self.rover_y))

    def draw_speech_bubble(self, text, x, y, width, height):
        # Draw the main bubble
        pygame.draw.ellipse(screen, WHITE, (x, y, width, height))
        pygame.draw.ellipse(screen, BLACK, (x, y, width, height), 2)
        
        # Draw the text
        self.draw_text(text, font, BLACK, x + width // 2, y + height // 2)

    def animate_terminal(self):
        current_time = pygame.time.get_ticks()
        if current_time - self.terminal_animation_timer > self.terminal_animation_speed:
            self.current_terminal = (self.current_terminal + 1) % len(self.terminal_images)
            self.terminal_animation_timer = current_time

    def draw_terminal(self):
        if self.terminal_state == 'STATIC':
            screen.blit(self.terminal1, (0, 0))
        else:
            screen.blit(self.terminal_images[self.current_terminal], (0, 0))

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
                        elif self.state == 'SELECT':
                            self.state = 'TERMINAL'
                        elif self.state == 'TERMINAL' and self.terminal_state == 'STATIC':
                            self.terminal_state = 'ANIMATED'
                        elif self.state == 'TERMINAL' and self.terminal_state == 'ANIMATED':
                            self.state = 'CLOUDS'
                            self.current_module = clouds
                if self.current_module:
                    self.current_module.run(self, event)
                

            if self.state in ['START', 'SELECT']:
                # Draw background1
                screen.blit(self.background1, (0, 0))
                
                # Draw and update stars
                self.draw_stars()
                self.update_stars()
                
                # Draw background2 on top of stars
                screen.blit(self.background2, (0, 0))

            # Animate rover
            self.animate_rover()

            if self.state == 'START':
                self.draw_rover()
                
                # Draw speech bubble
                self.draw_speech_bubble(WELCOME_MSG, self.rover_x - 100, self.rover_y - 125, 400, 100)
                
            elif self.state == 'SELECT':
                # Draw rover
                self.draw_rover()
                
                # Draw speech bubble (moved up)
                self.draw_speech_bubble('Please, tell me a little bit about yourself:', self.rover_x - 150, self.rover_y + self.rover_size[1] + 10, 500, 100)
                
                box_width, box_height = 400, 120
                box_spacing = 20
                total_height = 3 * box_height + 2 * box_spacing
                start_y = (HEIGHT - total_height) // 2 + 150  # Increased vertical offset

                # Draw language selection square
                self.draw_selection_square(WIDTH // 2 - box_width // 2, start_y, box_width, box_height, 'What language do you speak?', self.language)
                
                # Draw location selection square
                self.draw_selection_square(WIDTH // 2 - box_width // 2, start_y + box_height + box_spacing, box_width, box_height, 'Where are you located?', self.location)

                # Draw name input square
                self.draw_selection_square(WIDTH // 2 - box_width // 2, start_y + 2 * (box_height + box_spacing), box_width, box_height, "What's your name?", self.name)
                
            elif self.state == 'TERMINAL':
                # Draw terminal background
                self.draw_terminal()
                
                # Animate terminal if in ANIMATED state
                if self.terminal_state == 'ANIMATED':
                    self.animate_terminal()
            
            elif self.state == 'CLOUDS':
                # Draw stars background
                screen.blit(self.stars_background, (0, 0))

                # Update and draw clouds
                for cloud in self.clouds:
                    cloud.update(mouse_pos)
                self.draw_clouds()

            pygame.display.flip()
            clock.tick(60)

if __name__ == '__main__':
    game = SpaceGame()
    game.play()