def validate_file_size(file, max_size_mb):
    if file.size > max_size_mb * 1024 * 1024:
        raise ValueError(f"File size exceeds {max_size_mb}MB")
