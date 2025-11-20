public function up(): void
{
    Schema::create('compost', function (Blueprint $table) {
        $table->id('compost_id');
        $table->unsignedBigInteger('area_id')->nullable();
        $table->string('compost_type');
        $table->decimal('quantity_kg', 10, 2);
        $table->decimal('price_per_kg', 10, 2);
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('compost');
}
