import pygame
from constants import *

class MetaScene:
    def __init__(self):
        self.meta_image = pygame.image.load('assets/meta.jpg')
        self.meta_image = pygame.transform.scale(self.meta_image, (WIDTH, HEIGHT))

    def draw(self, surface):
        surface.blit(self.meta_image, (0, 0))

meta_scene = MetaScene()

def run(game, event):
    pass

def draw(surface):
    meta_scene.draw(surface)