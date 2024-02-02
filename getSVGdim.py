import xml.etree.ElementTree as ET

def read_svg_dimensions(svg_file):
    # Parse the SVG file
    tree = ET.parse(svg_file)
    root = tree.getroot()

    # Extract width and height attributes
    width = root.get('width')
    height = root.get('height')

    # Print dimensions to console
    print(f"Width: {width}, Height: {height}")

# Replace 'your_svg_file.svg' with the path to your SVG file
svg_file = 'frame.svg'
read_svg_dimensions(svg_file)
