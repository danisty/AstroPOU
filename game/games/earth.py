import pygame
from constants import *

class EarthScene:
    def __init__(self):
        self.earth1 = pygame.image.load('assets/tierra1.jpg')
        self.earth2 = pygame.image.load('assets/tierra2.jpg')
        self.earth1 = pygame.transform.scale(self.earth1, (WIDTH, HEIGHT))
        self.earth2 = pygame.transform.scale(self.earth2, (WIDTH, HEIGHT))
        self.current_image = self.earth1
        self.image_index = 0

    def next_image(self):
        self.image_index = (self.image_index + 1) % 2
        self.current_image = self.earth1 if self.image_index == 0 else self.earth2

    def draw(self, surface):
        surface.blit(self.current_image, (0, 0))

earth_scene = EarthScene()

def run(game, event):
    pass  # No need for automatic updates

def next_image():
    earth_scene.next_image()

def draw(surface):
    earth_scene.draw(surface)