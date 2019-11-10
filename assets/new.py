import cv2
import sys
import numpy as np

inp = sys.argv[1]

im = cv2.imread(inp)

res = np.hstack((im, im))
res = np.hstack((res, im))

res2 = np.vstack((res, res))
res2 = np.vstack((res2, res))

cv2.imwrite("darkfloor.png", res2)