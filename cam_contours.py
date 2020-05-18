import shutil
import colorit
import os
import sys
import numpy as np
import matplotlib.pyplot as plt
import cv2
sys.path.insert(
    0, "C:/Users/özgür isbert/appdata/local/programs/python/python37-32/lib/site-packages")

# Functions
version = "0.0.1a"


def clear():
    def _(): return os.system('cls')
    _()


def filler(ls="", rs=""):
    columns, rows = shutil.get_terminal_size()
    length = columns - 1
    s = ""
    c = colorit.color("█", colorit.colors.BLUE)
    empty = " "
    if len(ls) > 0:
        s = c + empty + ls
        if len(rs) > 0:
            z = length - (len(ls)+len(rs) + 4)
            for x2 in range(0, z):
                s += empty
            s += rs
            s += empty
        else:
            for x in range(0, ((length - (len(s))) + len(c) - 2)):
                s += empty
        s += c

    else:
        for x in range(0, (length - len(s))):
            s += c
    return s


def help():
    print(filler())
    print(filler(ls=" "))
    print(filler(
        ls="CCD - CamContoursDetection [Bilderkennung - Konturen]", rs="Version: "+version+""))
    print(filler(ls=" "))
    print(filler(ls=" "))
    print(filler(ls="Commands:"))
    print(filler(ls="-h[elp]", rs="Opens this help section!"))
    print(filler(ls="-a[ll]", rs="Run Programm with ALL windows"))
    print(filler(ls="-co[ntours-only]", rs="Run Programm with only contours"))
    print(filler(ls=" "))
    print(filler(ls="Please don't hold stuff to close too the camera, due to lags."))
    print(filler(ls=" "))
    print(filler(ls="Press 'q' to exit the Programm!"))
    print(filler())
    return


def cam_contour(only=False):

    print("Press 'q' to exit the Programm!")
    print("Waiting for Camera to show up...")
    cap = cv2.VideoCapture(0)

    colorMode = (0, 0, 255)

    while True:
        _, image = cap.read()
        # convert to grayscale
        grayscale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # perform edge detection
        edges = cv2.Canny(grayscale, 80, 200)
        # detect lines in the image using hough lines technique
        lines = cv2.HoughLinesP(edges, 1, np.pi/180, 60, np.array([]), 10, 5)
        # iterate over the output lines and draw them
        if lines is not None:
            for line in lines:
                for x1, y1, x2, y2 in line:
                    if not only:
                        cv2.line(image, (x1, y1), (x2, y2), colorMode, 5)
                    cv2.line(edges, (x1, y1), (x2, y2), colorMode, 5)
            # show images
            cv2.imshow("edges", edges)
            if not only:
                cv2.imshow("image", image)
        if cv2.waitKey(1) == ord("q"):
            print("Closing Programm...")
            break
    cap.release()
    cv2.destroyAllWindows()


def img_contour(only=False):
    cap = cv2.imread(sys.argv[len(sys.argv)])
    colorMode = (0, 0, 255)

    while True:
        _, image = cap.read()
        # convert to grayscale
        grayscale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # perform edge detection
        edges = cv2.Canny(grayscale, 80, 200)
        # detect lines in the image using hough lines technique
        lines = cv2.HoughLinesP(edges, 1, np.pi/180, 60, np.array([]), 10, 5)
        # iterate over the output lines and draw them
        if lines is not None:
            for line in lines:
                for x1, y1, x2, y2 in line:
                    if not only:
                        cv2.line(image, (x1, y1), (x2, y2), colorMode, 5)
                    cv2.line(edges, (x1, y1), (x2, y2), colorMode, 5)
            # show images
            cv2.imshow("edges", edges)
            if not only:
                cv2.imshow("image", image)
        if cv2.waitKey(1) == ord("q"):
            break
    cap.release()
    cv2.destroyAllWindows()


clear()
defaultmode = "contours"
mode = defaultmode
if len(sys.argv) > 1:
    mode = str(sys.argv[1])
    if "-h" in sys.argv or "-help" in sys.argv:
        help()
        exit()
    elif "-a" in sys.argv or "-all" in sys.argv:
        mode = "contours"
    elif "-co" in sys.argv or "-contours-only" in sys.argv:
        mode = "contours-only"
print("Preparing Programm...")
print("MODE: " + mode.upper())
if mode == "contours":
    cam_contour()
elif mode == "contours-only":
    cam_contour(only=True)
