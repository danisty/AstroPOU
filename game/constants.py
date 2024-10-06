import pygame
import sys
import random

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
DARK_GRAY = (50, 50, 50, 200)  # Semi-transparent dark gray
RED = (255, 0, 0)

WIDTH, HEIGHT = 1366, 768

WELCOME_MSG = 'Welcome, fellow terrestrial!'

# Initialize Pygame
pygame.init()

# Fonts
font = pygame.font.Font(None, 32)
big_font = pygame.font.Font(None, 48)

# Set up display
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption(WELCOME_MSG)