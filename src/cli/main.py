import curses

def intro_page(stdscr):
    curses.curs_set(0)  # Hide cursor
    stdscr.clear()

    # Centered welcome message
    h, w = stdscr.getmaxyx()
    text = "Welcome to My CLI App!"
    subtext = "Press any key to continue..."
    stdscr.addstr(h//2, (w - len(text))//2, text, curses.A_BOLD)
    stdscr.addstr(h//2 + 2, (w - len(subtext))//2, subtext)
    stdscr.refresh()

    stdscr.getch()  # Wait for user input

def main_menu(stdscr):
    curses.curs_set(0)
    menu = ["Home", "Settings", "Exit"]
    current_row = 0

    while True:
        stdscr.clear()
        for idx, row in enumerate(menu):
            if idx == current_row:
                stdscr.addstr(idx, 0, row, curses.A_REVERSE)
            else:
                stdscr.addstr(idx, 0, row)
        stdscr.refresh()

        key = stdscr.getch()
        if key == curses.KEY_UP and current_row > 0:
            current_row -= 1
        elif key == curses.KEY_DOWN and current_row < len(menu) - 1:
            current_row += 1
        elif key in [curses.KEY_ENTER, 10, 13]:
            if menu[current_row] == "Exit":
                break

def main(stdscr):
    intro_page(stdscr)   # Show intro first
    main_menu(stdscr)    # Then go to menu

curses.wrapper(main)
