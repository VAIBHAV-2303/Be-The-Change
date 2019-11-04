import sys
import cv2

inp = sys.argv[1]
a = cv2.imread(inp, 0)
cv2.imwrite(inp, a)