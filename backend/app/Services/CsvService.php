<?php

namespace App\Services;

class CsvService
{
    public static function load($filename)
    {
        $path = storage_path("app/public/$filename");

        if (!file_exists($path)) {
            return ['error' => "$filename not found"];
        }

        $rows = [];
        if (($handle = fopen($path, 'r')) !== false) {
            $headers = fgetcsv($handle);

            while (($data = fgetcsv($handle)) !== false) {
                $rows[] = array_combine($headers, $data);
            }

            fclose($handle);
        }

        return $rows;
    }
}
