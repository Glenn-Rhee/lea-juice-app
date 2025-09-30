<?php

namespace App\Libraries;

class Supabase
{
    private $url;
    private $key;

    public function __construct()
    {
        $this->url = getenv("SUPABASE_URL");
        $this->key = getenv("SUPABASE_KEY");
    }

    public function get($table)
    {
        $ch = curl_init("{$this->url}/rest/v1/{$table}");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "apikey: {$this->key}",
            "Authorization: Bearer {$this->key}",
            "Content-Type: application/json"
        ]);

        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    }
}