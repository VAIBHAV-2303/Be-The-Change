import sys, cv2

inp = sys.argv[1]

im = cv2.imread(inp, 0)

a = cv2.resize(im, (800, 800))

cv2.imwrite(inp, a)