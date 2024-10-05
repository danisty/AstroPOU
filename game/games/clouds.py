from constants import *

class Cloud:
    def __init__(self, image, x, y):
        self.image = image
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y
        self.dragging = False
        self.offset_x = 0
        self.offset_y = 0

    def update(self, mouse_pos):
        if self.dragging:
            self.rect.x = mouse_pos[0] - self.offset_x
            self.rect.y = mouse_pos[1] - self.offset_y

    def draw(self, surface):
        surface.blit(self.image, self.rect)

def run(game, event):
    if event.type == pygame.MOUSEBUTTONDOWN:
        for cloud in game.clouds:
            if cloud.rect.collidepoint(event.pos):
                cloud.dragging = True
                cloud.offset_x = event.pos[0] - cloud.rect.x
                cloud.offset_y = event.pos[1] - cloud.rect.y
                break
    if event.type == pygame.MOUSEBUTTONUP:
        for cloud in game.clouds:
            cloud.dragging = False