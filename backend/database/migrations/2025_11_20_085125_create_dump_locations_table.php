public function up(): void
{
    Schema::create('dump_locations', function (Blueprint $table) {
        $table->id('dump_location_id');
        $table->unsignedBigInteger('area_id')->nullable();
        $table->string('location_name');
        $table->string('address')->nullable();
        $table->decimal('latitude', 10, 6)->nullable();
        $table->decimal('longitude', 10, 6)->nullable();
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('dump_locations');
}
