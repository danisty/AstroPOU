import pygame
from constants import *

class NuevoScene:
    def __init__(self):
        self.images = [
            pygame.image.load('assets/nuevo1.jpg'),
            pygame.image.load('assets/nuevo2.jpg'),
            pygame.image.load('assets/nuevo3.jpg')
        ]
        self.images = [pygame.transform.scale(img, (WIDTH, HEIGHT)) for img in self.images]
        self.current_image = -1

    def next_image(self):
        if self.current_image == 2:
            self.current_image = 2
        else:
            self.current_image = self.current_image + 1

    def draw(self, surface):
        surface.blit(self.images[self.current_image], (0, 0))

nuevo_scene = NuevoScene()

def run(game, event):
    if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
        nuevo_scene.next_image()

def draw(surface):
    nuevo_scene.draw(surface)